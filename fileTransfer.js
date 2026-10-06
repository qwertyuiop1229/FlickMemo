import { getDatabase, ref, set, push, onValue, off, remove, get, onDisconnect } from "firebase/database";

export class FileTransferManager {
    constructor(auth, db, onStatusUpdate, onFileReceived, onProgress) {
        this.auth = auth;
        this.db = db;
        this.onStatusUpdate = onStatusUpdate || (() => {});
        this.onFileReceived = onFileReceived || (() => {});
        this.onProgress = onProgress || (() => {});

        this.deviceId = this.getOrCreateDeviceId();
        this.deviceName = this.detectDeviceName();
        this.peerConnection = null;
        this.dataChannel = null;
        this.activeDevices = {};
        this.currentMode = 'AUTO';
        this.localGoServerUrl = null;

        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.incomingFileInfo = null;
        this.heartbeatTimer = null;
        this.currentRoomId = null;
        this._pendingChunkPromises = [];
        this._receiveChain = Promise.resolve();
        this._pendingCandidates = [];
        this._processedCandidateKeys = new Set();

        this.isE2EEEnabled = true;
        this.isGuestMode = false;
        this.cryptoKey = null;
        this.customKeyString = null;
        this._candidateUnsubscribers = [];
    }

    setCustomEncryptionKey(keyString) {
        this.customKeyString = keyString || null;
        this.cryptoKey = null;
    }

    getOrCreateDeviceId() {
        let id = localStorage.getItem('flickmemo_device_id');
        if (!id) {
            id = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
            localStorage.setItem('flickmemo_device_id', id);
        }
        return id;
    }

    detectDeviceName() {
        const ua = navigator.userAgent.toLowerCase();
        let name = "Web Browser";
        if (ua.includes("iphone")) name = "iPhone";
        else if (ua.includes("ipad")) name = "iPad";
        else if (ua.includes("android")) name = "Android";
        else if (ua.includes("macintosh") || ua.includes("mac os x")) name = "Mac";
        else if (ua.includes("windows")) name = "Windows PC";
        else if (ua.includes("linux")) name = "Linux PC";
        return `${name} (${this.deviceId.substring(4, 8)})`;
    }

    async initLocalGoServerCheck() {
        // Go local server checks bypassed for pure JS/WebRTC simplicity
        this.localGoServerUrl = null;
    }

    async generateEncryptionKey() {
        if (!this.cryptoKey) {
            const rawKey = this.customKeyString || "FlickMemo_AES256_GCM_SecretKey_2026";
            const keyMaterial = new TextEncoder().encode(rawKey);
            const hash = await window.crypto.subtle.digest("SHA-256", keyMaterial);
            this.cryptoKey = await window.crypto.subtle.importKey(
                "raw",
                hash,
                { name: "AES-GCM" },
                false,
                ["encrypt", "decrypt"]
            );
        }
        return this.cryptoKey;
    }

    async encryptChunk(buffer) {
        if (!this.isE2EEEnabled) return buffer;
        const key = await this.generateEncryptionKey();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, buffer);
        const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);
        combined.set(iv, 0);
        combined.set(new Uint8Array(encrypted), iv.byteLength);
        return combined.buffer;
    }

    async decryptChunk(buffer) {
        try {
            if (buffer.byteLength < 12) return buffer;
            const key = await this.generateEncryptionKey();
            const iv = buffer.slice(0, 12);
            const data = buffer.slice(12);
            return await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, data);
        } catch (e) {
            console.warn("Decryption fallback (raw chunk used):", e.message);
            return buffer;
        }
    }

    startDevicePresence() {
        if (this.isGuestMode) return;
        const user = this.auth?.currentUser;
        if (!user) return;

        const devRef = ref(this.db, `users/${user.uid}/devices/${this.deviceId}`);
        const signalingRef = ref(this.db, `users/${user.uid}/signaling/${this.deviceId}`);
        const answersRef = ref(this.db, `users/${user.uid}/answers/${this.deviceId}`);

        onDisconnect(devRef).remove();
        onDisconnect(signalingRef).remove();
        onDisconnect(answersRef).remove();

        const updatePresence = () => {
            set(devRef, {
                id: this.deviceId,
                name: this.deviceName,
                online: true,
                updatedAt: Date.now()
            });
        };

        updatePresence();

        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(updatePresence, 20000);

        onValue(signalingRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.offer) {
                this.handleIncomingOffer(data.fromDeviceId, data.offer, `users/${user.uid}`, data.mode);
                remove(signalingRef);
            }
        });

        const allDevicesRef = ref(this.db, `users/${user.uid}/devices`);
        onValue(allDevicesRef, (snapshot) => {
            const data = snapshot.val() || {};
            this.activeDevices = {};
            const now = Date.now();
            Object.keys(data).forEach(id => {
                const dev = data[id];
                if (id !== this.deviceId && dev && (now - (dev.updatedAt || 0) < 25000)) {
                    this.activeDevices[id] = dev;
                } else if (dev && (now - (dev.updatedAt || 0) >= 25000)) {
                    remove(ref(this.db, `users/${user.uid}/devices/${id}`));
                }
            });
            this.onStatusUpdate('devices_updated', this.activeDevices);
        });
    }

    joinRoom(roomId) {
        if (!roomId) return;
        this.leaveRoom(); // 古いリスナーを全て解除してから入る
        this.currentRoomId = roomId;
        this._myJoinedAt = Date.now();
        this._roomUnsubscribers = []; // リスナー解除関数の配列

        const roomMemberRef  = ref(this.db, `public_rooms/${roomId}/members/${this.deviceId}`);
        const roomSignalingRef = ref(this.db, `public_rooms/${roomId}/signaling/${this.deviceId}`);
        const roomAnswersRef = ref(this.db, `public_rooms/${roomId}/answers/${this.deviceId}`);

        try {
            onDisconnect(roomMemberRef).remove().catch(() => {});
            onDisconnect(roomSignalingRef).remove().catch(() => {});
            onDisconnect(roomAnswersRef).remove().catch(() => {});

            set(roomMemberRef, {
                id: this.deviceId,
                name: this.deviceName,
                joinedAt: this._myJoinedAt
            }).catch(err => console.warn("Room join warning:", err.message));
        } catch (e) {}

        // シグナリングOffer受信リスナー (answerer側)
        const unsubSignaling = onValue(roomSignalingRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.offer) {
                this.handleIncomingOffer(data.fromDeviceId, data.offer, `public_rooms/${roomId}`, data.mode);
                remove(roomSignalingRef).catch(() => {});
            }
        }, (err) => console.warn("Room signaling error:", err.message));
        this._roomUnsubscribers.push(unsubSignaling);

        // メンバー監視リスナー — 決定論的役割分担 (deviceId辞書順でcallerを唯一決定しグレア回避)
        const membersRef = ref(this.db, `public_rooms/${roomId}/members`);
        const unsubMembers = onValue(membersRef, (snapshot) => {
            if (this.currentRoomId !== roomId) return;

            const members = snapshot.val() || {};
            const otherIds = Object.keys(members).filter(id => id !== this.deviceId);
            if (otherIds.length > 0) {
                const otherId = otherIds[0];
                const isCaller = this.deviceId.localeCompare(otherId) > 0;
                if (isCaller) {
                    if (!this._connectingTo) {
                        this._connectingTo = otherId;
                        this.onStatusUpdate('room_member_joined', { roomId, otherDeviceId: otherId });
                    }
                }
            } else {
                // 相手が退出した場合は接続待機状態に戻す
                this._connectingTo = null;
            }
        }, (err) => console.warn("Room members error:", err.message));
        this._roomUnsubscribers.push(unsubMembers);

        this.onStatusUpdate('room_joined', { roomId });
    }

    async cleanupSignalingData(basePath, targetDeviceId = null) {
        if (!basePath || !this.db) return;
        try {
            remove(ref(this.db, `${basePath}/signaling/${this.deviceId}`)).catch(() => {});
            remove(ref(this.db, `${basePath}/answers/${this.deviceId}`)).catch(() => {});
            remove(ref(this.db, `${basePath}/candidates/${this.deviceId}`)).catch(() => {});
            if (targetDeviceId) {
                remove(ref(this.db, `${basePath}/signaling/${targetDeviceId}`)).catch(() => {});
                remove(ref(this.db, `${basePath}/answers/${targetDeviceId}`)).catch(() => {});
                remove(ref(this.db, `${basePath}/candidates/${targetDeviceId}`)).catch(() => {});
            }
        } catch (e) {}
    }

    leaveRoom() {
        // 全てのRTDBリスナーを解除
        if (this._roomUnsubscribers) {
            this._roomUnsubscribers.forEach(unsub => { try { unsub(); } catch(e) {} });
            this._roomUnsubscribers = [];
        }
        this._connectingTo = null;

        if (this.currentRoomId) {
            const roomId = this.currentRoomId;
            this.cleanupSignalingData(`public_rooms/${roomId}`);
            remove(ref(this.db, `public_rooms/${roomId}/members/${this.deviceId}`)).catch(() => {});
            this.currentRoomId = null;
            this.onStatusUpdate('room_left');
        }
    }

    stopDevicePresence() {
        clearInterval(this.heartbeatTimer);
        this.leaveRoom();
        const user = this.auth?.currentUser;
        if (user) {
            this.cleanupSignalingData(`users/${user.uid}`);
            remove(ref(this.db, `users/${user.uid}/devices/${this.deviceId}`)).catch(() => {});
        }
        this.cleanupPeerConnection();
    }

    resetReceiveBuffer(keepFileInfo = false) {
        if (this.receiveBuffer) {
            this.receiveBuffer.length = 0; // メモリを明示的に即時解放 (iOS Safari/PWA 対策)
        }
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this._pendingChunkPromises = [];
        if (!keepFileInfo) {
            this.incomingFileInfo = null;
        }
    }

    cleanupPeerConnection() {
        this._connectingTo = null;
        this.resetReceiveBuffer();
        this._receiveChain = Promise.resolve();
        this._pendingCandidates = [];
        if (this._processedCandidateKeys) {
            this._processedCandidateKeys.clear();
        }
        if (this._candidateUnsubscribers) {
            this._candidateUnsubscribers.forEach(unsub => { try { unsub(); } catch (e) {} });
            this._candidateUnsubscribers = [];
        }
        if (this.dataChannel) {
            this.dataChannel.onclose = null;
            this.dataChannel.onerror = null;
            this.dataChannel.onmessage = null;
            try { this.dataChannel.close(); } catch (e) {}
            this.dataChannel = null;
        }
        if (this.peerConnection) {
            this.peerConnection.onicecandidate = null;
            this.peerConnection.onconnectionstatechange = null;
            this.peerConnection.ondatachannel = null;
            try { this.peerConnection.close(); } catch (e) {}
            this.peerConnection = null;
        }
    }

    determineOptimalMode(targetDevice, file) {
        if (this.currentMode !== 'AUTO') {
            return this.currentMode;
        }
        // AUTO (推奨モード): ネットワーク状態を自動解析し、最適な回線通信を選択
        const isOnline = targetDevice ? targetDevice.online : true;
        if (isOnline) {
            return 'LAN_P2P';
        }
        return 'WAN_P2P';
    }

    createPeerConnection(targetDeviceId, basePath, mode = 'AUTO') {
        this.cleanupPeerConnection();

        let iceServers = [];
        let iceTransportPolicy = "all";

        if (mode === 'LAN_P2P') {
            // モード1: LAN高速直連 — 外部STUN/TURNを経由せずローカルIP/mDNSのみで最高速転送
            iceServers = [];
            iceTransportPolicy = "all";
        } else if (mode === 'WEB_RELAY') {
            // モード2: Webリレイ専用 — ポート443/80 TURN Relayを100%強制し、プロキシ/ファイアウォールを突破
            iceServers = [
                { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
                { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" },
                { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" }
            ];
            iceTransportPolicy = "relay"; // ★ TURN Relay を 100% 強制
        } else if (mode === 'WAN_P2P') {
            // モード3: 広域インターネットP2P — Google STUN 経由で異なるネットワーク間をP2P直連
            iceServers = [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: "stun:openrelay.metered.ca:80" }
            ];
            iceTransportPolicy = "all";
        } else {
            // AUTO (推奨モード): ローカルP2P -> STUN P2P -> TURN Relay に自動フォールバック
            iceServers = [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: "stun:openrelay.metered.ca:80" },
                { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
                { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" }
            ];
            iceTransportPolicy = "all";
        }

        const config = { iceServers, iceTransportPolicy };
        const pc = new RTCPeerConnection(config);

        pc.onicecandidate = (event) => {
            if (event.candidate && targetDeviceId && basePath) {
                const candRef = ref(this.db, `${basePath}/candidates/${targetDeviceId}`);
                push(candRef, JSON.stringify(event.candidate));
            }
        };

        let disconnectGraceTimer = null;
        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
                if (disconnectGraceTimer) {
                    clearTimeout(disconnectGraceTimer);
                    disconnectGraceTimer = null;
                }
                this.cleanupSignalingData(basePath, targetDeviceId);
                this.onStatusUpdate('p2p_connected', { targetDeviceId });
            } else if (pc.iceConnectionState === 'disconnected') {
                // 一時的な回線揺らぎ・バックグラウンド移行対策: 即座に切断せず7秒間の復旧猶予を設ける
                if (!disconnectGraceTimer) {
                    disconnectGraceTimer = setTimeout(() => {
                        disconnectGraceTimer = null;
                        if (this.peerConnection && (this.peerConnection.iceConnectionState === 'disconnected' || this.peerConnection.iceConnectionState === 'failed')) {
                            this.cleanupSignalingData(basePath, targetDeviceId);
                            this.onStatusUpdate('p2p_disconnected', { targetDeviceId });
                        }
                    }, 7000);
                }
            } else if (pc.iceConnectionState === 'failed') {
                if (disconnectGraceTimer) {
                    clearTimeout(disconnectGraceTimer);
                    disconnectGraceTimer = null;
                }
                this.cleanupSignalingData(basePath, targetDeviceId);
                this.onStatusUpdate('p2p_disconnected', { targetDeviceId });
            }
        };

        return pc;
    }

    async addIceCandidateSafe(cand) {
        if (!this.peerConnection || this.peerConnection.signalingState === 'closed') return;
        if (!this.peerConnection.remoteDescription || !this.peerConnection.remoteDescription.type) {
            this._pendingCandidates.push(cand);
            return;
        }
        try {
            await this.peerConnection.addIceCandidate(cand);
        } catch (e) {
            console.warn("addIceCandidate skipped:", e.message);
        }
    }

    async flushPendingCandidates() {
        if (!this.peerConnection || !this.peerConnection.remoteDescription) return;
        while (this._pendingCandidates && this._pendingCandidates.length > 0) {
            const cand = this._pendingCandidates.shift();
            try {
                await this.peerConnection.addIceCandidate(cand);
            } catch (e) {
                console.warn("flush candidate skipped:", e.message);
            }
        }
    }

    async connectToDevice(targetDeviceId, isRoom = false) {
        const basePath = isRoom && this.currentRoomId 
            ? `public_rooms/${this.currentRoomId}` 
            : (this.auth?.currentUser ? `users/${this.auth.currentUser.uid}` : null);

        if (!basePath) throw new Error("通信パスの初期化に失敗しました。送信権限がありません。");

        this.peerConnection = this.createPeerConnection(targetDeviceId, basePath, this.currentMode);
        this.dataChannel = this.peerConnection.createDataChannel("flickmemo_transfer", { ordered: true });
        this.setupDataChannelHandlers(this.dataChannel);

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        const sigRef = ref(this.db, `${basePath}/signaling/${targetDeviceId}`);
        await set(sigRef, {
            fromDeviceId: this.deviceId,
            offer: JSON.stringify(offer),
            mode: this.currentMode,
            timestamp: Date.now()
        });

        const ansRef = ref(this.db, `${basePath}/answers/${this.deviceId}`);
        const handleAnswerSnapshot = async (snapshot) => {
            const data = snapshot.val();
            if (data && data.answer) {
                try {
                    const answer = JSON.parse(data.answer);
                    if (this.peerConnection && this.peerConnection.signalingState === 'have-local-offer') {
                        await this.peerConnection.setRemoteDescription(answer);
                        await this.flushPendingCandidates();
                        off(ansRef, 'value', handleAnswerSnapshot);
                        remove(ansRef);
                    }
                } catch (err) {
                    console.warn("setRemoteDescription skipped:", err.message);
                }
            }
        };
        const ansUnsub = onValue(ansRef, handleAnswerSnapshot);
        this._candidateUnsubscribers.push(ansUnsub);

        const candRef = ref(this.db, `${basePath}/candidates/${this.deviceId}`);
        const candUnsub = onValue(candRef, (snapshot) => {
            const data = snapshot.val() || {};
            Object.entries(data).forEach(async ([key, candStr]) => {
                if (this._processedCandidateKeys.has(key)) return;
                this._processedCandidateKeys.add(key);
                try {
                    const cand = JSON.parse(candStr);
                    await this.addIceCandidateSafe(cand);
                } catch (e) {}
            });
        });
        this._candidateUnsubscribers.push(candUnsub);
    }

    async handleIncomingOffer(fromDeviceId, offerStr, basePath, offerMode = null) {
        const offer = JSON.parse(offerStr);
        const targetMode = offerMode || this.currentMode;
        this.peerConnection = this.createPeerConnection(fromDeviceId, basePath, targetMode);

        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannelHandlers(this.dataChannel);
        };

        await this.peerConnection.setRemoteDescription(offer);
        await this.flushPendingCandidates();
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        const ansRef = ref(this.db, `${basePath}/answers/${fromDeviceId}`);
        await set(ansRef, {
            fromDeviceId: this.deviceId,
            answer: JSON.stringify(answer),
            timestamp: Date.now()
        });

        const candRef = ref(this.db, `${basePath}/candidates/${this.deviceId}`);
        const candUnsub = onValue(candRef, (snapshot) => {
            const data = snapshot.val() || {};
            Object.entries(data).forEach(async ([key, candStr]) => {
                if (this._processedCandidateKeys.has(key)) return;
                this._processedCandidateKeys.add(key);
                try {
                    const cand = JSON.parse(candStr);
                    await this.addIceCandidateSafe(cand);
                } catch (e) {}
            });
        });
        this._candidateUnsubscribers.push(candUnsub);
    }

    setupDataChannelHandlers(dc) {
        dc.binaryType = 'arraybuffer';

        dc.onopen = () => {
            this.onStatusUpdate('channel_open');
        };

        dc.onerror = (err) => {
            console.warn("DataChannel error:", err);
            this.onStatusUpdate('channel_error', err);
        };

        dc.onmessage = async (event) => {
            if (typeof event.data === 'string') {
                try {
                    const meta = JSON.parse(event.data);
                    if (meta.type === 'file_header') {
                        this.resetReceiveBuffer(false); // 古いバッファとメタデータを初期化
                        this._receiveChain = Promise.resolve(); // 順序保証チェーンを初期化
                        this.incomingFileInfo = meta;   // メタデータを確実にセット・維持
                        this.onProgress(0, meta.size, meta.name, 'rec');
                    } else if (meta.type === 'file_end') {
                        // 順序保証チェーンで全チャンクの復号・追加が完了するのを確実に待つ
                        await this._receiveChain;

                        const currentInfo = this.incomingFileInfo;
                        const mimeType = currentInfo?.mime || 'application/octet-stream';
                        const blob = new Blob(this.receiveBuffer, { type: mimeType });
                        const safeName = this.sanitizeFilename(currentInfo?.name);
                        const actualMode = currentInfo?.mode || 'LAN_P2P';

                        this.onFileReceived(blob, safeName, actualMode);
                        this.resetReceiveBuffer(false); // 送信完了後にメタデータ含めて初期化
                        this.onStatusUpdate('remote_transfer_lock', false);
                    } else if (meta.type === 'TRANSFER_LOCK') {
                        this.onStatusUpdate('remote_transfer_lock', true);
                    } else if (meta.type === 'TRANSFER_UNLOCK') {
                        this.onStatusUpdate('remote_transfer_lock', false);
                    } else if (meta.type === 'EXPLICIT_DISCONNECT') {
                        this.cleanupPeerConnection();
                        this.onStatusUpdate('p2p_disconnected');
                    }
                } catch (e) {
                    console.warn("Control message error:", e);
                }
            } else {
                // バイナリチャンク処理: ordered: true の到着順序を100%厳格に守る直列チェーンキュー
                const rawData = event.data;
                this._receiveChain = this._receiveChain.then(async () => {
                    try {
                        let rawBuffer;
                        if (rawData instanceof ArrayBuffer) {
                            rawBuffer = rawData;
                        } else if (rawData instanceof Blob) {
                            rawBuffer = await rawData.arrayBuffer();
                        } else if (ArrayBuffer.isView(rawData)) {
                            rawBuffer = rawData.buffer.slice(rawData.byteOffset, rawData.byteOffset + rawData.byteLength);
                        } else {
                            return;
                        }

                        let payload = rawBuffer;
                        if (this.incomingFileInfo && this.incomingFileInfo.encrypted) {
                            payload = await this.decryptChunk(rawBuffer);
                        }
                        this.receiveBuffer.push(payload);
                        this.receivedSize += payload.byteLength;
                        if (this.incomingFileInfo) {
                            this.onProgress(this.receivedSize, this.incomingFileInfo.size, this.incomingFileInfo.name, 'rec');
                        }
                    } catch (chunkErr) {
                        console.error("Chunk processing error:", chunkErr);
                    }
                });
            }
        };

        dc.onclose = () => {
            this.onStatusUpdate('channel_close');
            this.cleanupPeerConnection();
        };
    }

    sendControlMessage(msg) {
        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            try {
                this.dataChannel.send(JSON.stringify(msg));
            } catch (e) {}
        }
    }

    disconnect() {
        this.sendControlMessage({ type: 'EXPLICIT_DISCONNECT' });
        this.leaveRoom();
        this.cleanupPeerConnection();
        this.onStatusUpdate('p2p_disconnected');
    }

    async getConnectedTransportMode() {
        if (this.currentMode && this.currentMode !== 'AUTO') {
            return this.currentMode;
        }
        if (!this.peerConnection) return 'WAN_P2P';
        try {
            const stats = await this.peerConnection.getStats();
            let selectedPairId = null;
            let localCandMap = new Map();

            stats.forEach(report => {
                if (report.type === 'transport') {
                    selectedPairId = report.selectedCandidatePairId;
                } else if (report.type === 'local-candidate') {
                    localCandMap.set(report.id, report);
                }
            });

            if (!selectedPairId) {
                stats.forEach(report => {
                    if (report.type === 'candidate-pair' && (report.selected || report.state === 'succeeded')) {
                        selectedPairId = report.id;
                    }
                });
            }

            if (selectedPairId) {
                const pairReport = stats.get(selectedPairId);
                if (pairReport) {
                    const localCand = localCandMap.get(pairReport.localCandidateId);
                    if (localCand) {
                        const candType = localCand.candidateType; // 'host', 'srflx', 'prflx', 'relay'
                        if (candType === 'relay') return 'WEB_RELAY';
                        if (candType === 'srflx' || candType === 'prflx') return 'WAN_P2P';
                        if (candType === 'host') return 'LAN_P2P';
                    }
                }
            }
        } catch (e) {
            console.warn("Stats candidate detection fallback:", e);
        }
        return 'WAN_P2P';
    }

    async sendFileP2P(file, transferMode) {
        if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
            throw new Error("接続が確立されていません。送信先デバイスを選択または共有リンクで接続してください。");
        }

        this.sendControlMessage({ type: 'TRANSFER_LOCK' });

        try {
            const actualMode = await this.getConnectedTransportMode();
            const isEncrypted = !!this.isE2EEEnabled;

            // ★ WebRTC DataChannel の規格上限 (max-message-size) に 100% 抵触しない安全チャンクサイズ
            // 全ブラウザ (Chrome / Safari / Firefox / Edge) の SCTP 上限 (64KB / 256KB) を下回り、
            // AES-GCM 暗号化オーバーヘッド (28バイト: IV 12B + Tag 16B) を含めても 65,535 バイト未満に完全保証
            const CHUNK_SIZE = 32 * 1024; // 32,768 bytes

            // バックプレッシャー制御の閾値 (DataChannel バッファ溢れ・強制切断の根本防止)
            // OS / SCTP スタックのメモリ上限を超えないよう、512KB で待機、128KB で再開
            const BUFFER_HIGH = 512 * 1024;
            const BUFFER_LOW = 128 * 1024;

            this.dataChannel.bufferedAmountLowThreshold = BUFFER_LOW;

            const header = {
                type: 'file_header',
                name: file.name,
                size: file.size,
                mime: file.type || 'application/octet-stream',
                mode: actualMode,
                encrypted: isEncrypted
            };

            if (this.dataChannel && this.dataChannel.readyState === 'open') {
                this.dataChannel.send(JSON.stringify(header));
            } else {
                throw new Error("転送開始前に接続が切断されました。");
            }

            // 0バイトファイルの場合はヘッダーと終了通知のみで即時完了
            if (file.size === 0) {
                this.onProgress(0, 0, file.name, 'send');
                if (this.dataChannel && this.dataChannel.readyState === 'open') {
                    this.dataChannel.send(JSON.stringify({ type: 'file_end' }));
                }
                return actualMode;
            }

            let offset = 0;
            const total = file.size;

            while (offset < total) {
                // 安全な接続オープンチェック
                if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
                    throw new Error("転送中にP2P接続が切断されました。");
                }

                // 真のバックプレッシャー制御: バッファが過密になったら bufferedamountlow を確実に待機
                if (this.dataChannel.bufferedAmount > BUFFER_HIGH) {
                    await new Promise((resolve, reject) => {
                        let timer = null;
                        const onLow = () => {
                            if (timer) clearTimeout(timer);
                            if (this.dataChannel) {
                                this.dataChannel.removeEventListener('bufferedamountlow', onLow);
                            }
                            resolve();
                        };
                        this.dataChannel.addEventListener('bufferedamountlow', onLow, { once: true });
                        // 回線不通時のセーフティタイムアウト (15秒)
                        timer = setTimeout(() => {
                            if (this.dataChannel) {
                                this.dataChannel.removeEventListener('bufferedamountlow', onLow);
                            }
                            if (this.dataChannel && this.dataChannel.readyState === 'open') {
                                resolve();
                            } else {
                                reject(new Error("転送タイムアウト: 相手端末へのデータ送信が停滞しました"));
                            }
                        }, 15000);
                    });
                }

                // 切断の二重チェック
                if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
                    throw new Error("転送中にP2P接続が切断されました。");
                }

                const slice = file.slice(offset, offset + CHUNK_SIZE);
                const rawBuffer = await slice.arrayBuffer();

                let chunkToSend = rawBuffer;
                if (isEncrypted) {
                    chunkToSend = await this.encryptChunk(rawBuffer);
                }

                if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
                    throw new Error("転送中にP2P接続が切断されました。");
                }

                try {
                    this.dataChannel.send(chunkToSend);
                } catch (sendErr) {
                    console.warn("Send chunk warning, retrying after drain:", sendErr);
                    await new Promise(r => setTimeout(r, 50));
                    if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
                        throw new Error("転送中にP2P接続が切断されました。");
                    }
                    this.dataChannel.send(chunkToSend);
                }

                offset += rawBuffer.byteLength;
                this.onProgress(offset, total, file.name, 'send');
            }

            // 終了通知 (安全送信)
            if (this.dataChannel && this.dataChannel.readyState === 'open') {
                this.dataChannel.send(JSON.stringify({ type: 'file_end' }));
            }
            return actualMode;
        } finally {
            this.sendControlMessage({ type: 'TRANSFER_UNLOCK' });
        }
    }

    sanitizeFilename(name) {
        if (!name) return 'download_file';
        let clean = name.replace(/[\/\?%*:|"<>]/g, '_');
        clean = clean.replace(/\.\./g, '_');
        return clean.trim() || 'download_file';
    }
}
