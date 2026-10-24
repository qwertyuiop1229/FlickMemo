import { getDatabase, ref, set, push, onValue, off, remove, get, onDisconnect } from "firebase/database";

export const MAX_RECEIVE_BYTES = 64 * 1024 * 1024;
const MAX_QUEUED_BYTES = 4 * 1024 * 1024;

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
        this._presenceUnsubscribers = [];
        this._presenceUid = null;
        this._queuedReceiveBytes = 0;
        this._receiveGeneration = 0;
        this._sessionKey = null;
        this._isInitiator = false;
    }

    setCustomEncryptionKey(keyString) {
        this.customKeyString = keyString || null;
        this.cryptoKey = null;
    }

    getOrCreateDeviceId() {
        // Each open page owns its listeners and presence entry. Sharing an ID via
        // localStorage let one tab remove another tab's entry or consume its offer.
        return 'dev_' + crypto.randomUUID().replaceAll('-', '');
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
            const rawKey = this.customKeyString || this._sessionKey;
            if (!rawKey) throw new Error('暗号化セッションが準備できていません');
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
        if (buffer.byteLength < 28) throw new Error('暗号化データが不正です');
        const key = await this.generateEncryptionKey();
        const iv = buffer.slice(0, 12);
        return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv: new Uint8Array(iv) }, key, buffer.slice(12));
    }

    async signRoomData(data, basePath) {
        if (!basePath.startsWith('public_rooms/')) return data;
        if (!this.customKeyString) throw new Error('共有リンクの暗号化キーがありません');
        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(this.customKeyString), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const canonical = JSON.stringify(Object.keys(data).sort().map(key => [key, data[key]]));
        const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(canonical));
        return { ...data, proof: Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('') };
    }

    async verifyRoomData(data, basePath) {
        if (!basePath.startsWith('public_rooms/')) return true;
        if (!this.customKeyString || !data || !/^[a-f0-9]{64}$/.test(data.proof || '') ||
            !Number.isFinite(data.timestamp) || Math.abs(Date.now() - data.timestamp) > 300000) return false;
        const { proof, ...payload } = data;
        const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(this.customKeyString), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
        const signature = Uint8Array.from(proof.match(/../g), byte => parseInt(byte, 16));
        const canonical = JSON.stringify(Object.keys(payload).sort().map(key => [key, payload[key]]));
        return crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(canonical));
    }

    async handleSignalingOffer(data, basePath) {
        const roomId = this.currentRoomId;
        if (!await this.verifyRoomData(data, basePath) || this.currentRoomId !== roomId || basePath !== `public_rooms/${roomId}`) return;
        return this.handleIncomingOffer(data.fromDeviceId, data.offer, basePath, data.mode);
    }

    startDevicePresence() {
        if (this.isGuestMode) return;
        const user = this.auth?.currentUser;
        if (!user) return;

        if (this._presenceUid === user.uid) return;
        this.stopDevicePresence();
        this._presenceUid = user.uid;
        const devRef = ref(this.db, `users/${user.uid}/devices/${this.deviceId}`);
        const signalingRef = ref(this.db, `users/${user.uid}/signaling/${this.deviceId}`);
        const answersRef = ref(this.db, `users/${user.uid}/answers/${this.deviceId}`);

        onDisconnect(devRef).remove().catch(error => this.onStatusUpdate('channel_error', error));
        onDisconnect(signalingRef).remove().catch(() => {});
        onDisconnect(answersRef).remove().catch(() => {});

        const updatePresence = () => {
            set(devRef, {
                id: this.deviceId,
                name: this.deviceName,
                online: true,
                updatedAt: Date.now()
            }).catch(error => this.onStatusUpdate('channel_error', error));
        };

        updatePresence();

        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(updatePresence, 20000);

        this._presenceUnsubscribers.push(onValue(signalingRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.offer) {
                this.handleIncomingOffer(data.fromDeviceId, data.offer, `users/${user.uid}`, data.mode).catch(error => this.onStatusUpdate('channel_error', error));
                remove(signalingRef);
            }
        }));

        const allDevicesRef = ref(this.db, `users/${user.uid}/devices`);
        this._presenceUnsubscribers.push(onValue(allDevicesRef, (snapshot) => {
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
        }));
    }

    joinRoom(roomId) {
        if (!/^rm_[A-Za-z0-9_-]{32}$/.test(roomId || '')) throw new Error('共有ルームIDが不正です');
        this.cleanupPeerConnection();
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
                this.handleSignalingOffer(data, `public_rooms/${roomId}`).catch(error => this.onStatusUpdate('channel_error', error));
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
        this.heartbeatTimer = null;
        this._presenceUnsubscribers.splice(0).forEach(unsubscribe => unsubscribe());
        this.leaveRoom();
        if (this._presenceUid) {
            this.cleanupSignalingData(`users/${this._presenceUid}`);
            remove(ref(this.db, `users/${this._presenceUid}/devices/${this.deviceId}`)).catch(() => {});
        }
        this._presenceUid = null;
        this.activeDevices = {};
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
        ++this._receiveGeneration;
        this._sessionKey = null;
        this.cryptoKey = null;
        clearTimeout(this._disconnectGraceTimer);
        this._queuedReceiveBytes = 0;
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
            this.dataChannel.onopen = null;
            this.dataChannel.onclose = null;
            this.dataChannel.onerror = null;
            this.dataChannel.onmessage = null;
            try { this.dataChannel.close(); } catch (e) {}
            this.dataChannel = null;
        }
        if (this.peerConnection) {
            this.peerConnection.oniceconnectionstatechange = null;
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

        pc.onicecandidate = async (event) => {
            if (this.peerConnection === pc && event.candidate && targetDeviceId && basePath) {
                const candRef = ref(this.db, `${basePath}/candidates/${targetDeviceId}`);
                try {
                    const data = await this.signRoomData({ candidate: JSON.stringify(event.candidate), timestamp: Date.now() }, basePath);
                    if (this.peerConnection !== pc) return;
                    await push(candRef, basePath.startsWith('public_rooms/') ? JSON.stringify(data) : data.candidate);
                } catch (error) { this.onStatusUpdate('channel_error', error); }
            }
        };

        this._disconnectGraceTimer = null;
        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
                if (this._disconnectGraceTimer) {
                    clearTimeout(this._disconnectGraceTimer);
                    this._disconnectGraceTimer = null;
                }
                this.cleanupSignalingData(basePath, targetDeviceId);
                this.onStatusUpdate('p2p_connected', { targetDeviceId });
            } else if (pc.iceConnectionState === 'disconnected') {
                // 一時的な回線揺らぎ・バックグラウンド移行対策: 即座に切断せず7秒間の復旧猶予を設ける
                if (!this._disconnectGraceTimer) {
                    this._disconnectGraceTimer = setTimeout(() => {
                        this._disconnectGraceTimer = null;
                        if (this.peerConnection && (this.peerConnection.iceConnectionState === 'disconnected' || this.peerConnection.iceConnectionState === 'failed')) {
                            this.cleanupSignalingData(basePath, targetDeviceId);
                            this.onStatusUpdate('p2p_disconnected', { targetDeviceId });
                        }
                    }, 7000);
                }
            } else if (pc.iceConnectionState === 'failed') {
                if (this._disconnectGraceTimer) {
                    clearTimeout(this._disconnectGraceTimer);
                    this._disconnectGraceTimer = null;
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
            if (this._pendingCandidates.length >= 256) return;
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

        if (!isRoom) this.setCustomEncryptionKey(null);
        if (!basePath) throw new Error("通信パスの初期化に失敗しました。送信権限がありません。");

        const pc = this.peerConnection = this.createPeerConnection(targetDeviceId, basePath, this.currentMode);
        this._connectingTo = targetDeviceId;
        this.dataChannel = pc.createDataChannel("flickmemo_transfer", { ordered: true });
        this._isInitiator = true;
        this.setupDataChannelHandlers(this.dataChannel);

        const offer = await pc.createOffer();
        if (this.peerConnection !== pc) return;
        await pc.setLocalDescription(offer);
        if (this.peerConnection !== pc) return;

        const sigRef = ref(this.db, `${basePath}/signaling/${targetDeviceId}`);
        const signal = await this.signRoomData({
            fromDeviceId: this.deviceId,
            offer: JSON.stringify(offer),
            mode: this.currentMode,
            timestamp: Date.now()
        }, basePath);
        if (this.peerConnection !== pc) return;
        await set(sigRef, signal);
        if (this.peerConnection !== pc) return;

        const ansRef = ref(this.db, `${basePath}/answers/${this.deviceId}`);
        const handleAnswerSnapshot = async (snapshot) => {
            const data = snapshot.val();
            if (data && data.answer) {
                try {
                    if (!await this.verifyRoomData(data, basePath) || this.peerConnection !== pc) return;
                    const answer = JSON.parse(data.answer);
                    if (pc.signalingState === 'have-local-offer') {
                        await pc.setRemoteDescription(answer);
                        if (this.peerConnection !== pc) return;
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
            if (this.peerConnection !== pc) return;
            const data = snapshot.val() || {};
            Object.entries(data).forEach(async ([key, candStr]) => {
                if (this._processedCandidateKeys.has(key)) return;
                if (this._processedCandidateKeys.size >= 512) return;
                this._processedCandidateKeys.add(key);
                try {
                    let cand = JSON.parse(candStr);
                    if (basePath.startsWith('public_rooms/')) {
                        if (!await this.verifyRoomData(cand, basePath)) return;
                        cand = JSON.parse(cand.candidate);
                    }
                    if (this.peerConnection !== pc) return;
                    await this.addIceCandidateSafe(cand);
                } catch (e) {}
            });
        });
        this._candidateUnsubscribers.push(candUnsub);
    }

    async handleIncomingOffer(fromDeviceId, offerStr, basePath, offerMode = null) {
        if (this.dataChannel?.readyState === 'open') return;
        if (typeof offerStr !== 'string' || offerStr.length > 65536 || !/^dev_[A-Za-z0-9_-]+$/.test(fromDeviceId || '')) throw new Error('接続要求が不正です');
        const offer = JSON.parse(offerStr);
        if (offer.type !== 'offer' || typeof offer.sdp !== 'string') throw new Error('接続要求が不正です');
        if (basePath.startsWith('users/')) this.setCustomEncryptionKey(null);
        const targetMode = offerMode || this.currentMode;
        const pc = this.peerConnection = this.createPeerConnection(fromDeviceId, basePath, targetMode);
        this._connectingTo = fromDeviceId;

        this._isInitiator = false;
        pc.ondatachannel = (event) => {
            if (this.peerConnection !== pc) return;
            this.dataChannel = event.channel;
            this.setupDataChannelHandlers(this.dataChannel);
        };

        await pc.setRemoteDescription(offer);
        if (this.peerConnection !== pc) return;
        await this.flushPendingCandidates();
        if (this.peerConnection !== pc) return;
        const answer = await pc.createAnswer();
        if (this.peerConnection !== pc) return;
        await pc.setLocalDescription(answer);
        if (this.peerConnection !== pc) return;

        const ansRef = ref(this.db, `${basePath}/answers/${fromDeviceId}`);
        const signal = await this.signRoomData({
            fromDeviceId: this.deviceId,
            answer: JSON.stringify(answer),
            timestamp: Date.now()
        }, basePath);
        if (this.peerConnection !== pc) return;
        await set(ansRef, signal);
        if (this.peerConnection !== pc) return;

        const candRef = ref(this.db, `${basePath}/candidates/${this.deviceId}`);
        const candUnsub = onValue(candRef, (snapshot) => {
            if (this.peerConnection !== pc) return;
            const data = snapshot.val() || {};
            Object.entries(data).forEach(async ([key, candStr]) => {
                if (this._processedCandidateKeys.has(key)) return;
                if (this._processedCandidateKeys.size >= 512) return;
                this._processedCandidateKeys.add(key);
                try {
                    let cand = JSON.parse(candStr);
                    if (basePath.startsWith('public_rooms/')) {
                        if (!await this.verifyRoomData(cand, basePath)) return;
                        cand = JSON.parse(cand.candidate);
                    }
                    if (this.peerConnection !== pc) return;
                    await this.addIceCandidateSafe(cand);
                } catch (e) {}
            });
        });
        this._candidateUnsubscribers.push(candUnsub);
    }

    setupDataChannelHandlers(dc) {
        dc.binaryType = 'arraybuffer';

        dc.onopen = () => {
            if (this.dataChannel !== dc) return;
            if (this.customKeyString) {
                this.onStatusUpdate('channel_open');
            } else if (this._isInitiator) {
                this._sessionKey = Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join('');
                dc.send(JSON.stringify({ type: 'SESSION_KEY', key: this._sessionKey }));
            }
        };

        dc.onerror = (err) => {
            console.warn("DataChannel error:", err);
            this.onStatusUpdate('channel_error', err);
        };

        dc.onmessage = event => {
            if (this.dataChannel !== dc) return;
            const generation = this._receiveGeneration;
            const data = event.data;
            const queuedBytes = typeof data === 'string' ? data.length * 2 : (data.byteLength ?? data.size ?? 0);
            this._queuedReceiveBytes += queuedBytes;
            if (this._queuedReceiveBytes > MAX_QUEUED_BYTES) {
                this.cleanupPeerConnection();
                this.onStatusUpdate('channel_error', new Error('受信待ちデータが上限を超えました'));
                return;
            }
            // Serialize control messages as well as chunks: a second header must
            // never reset the first file while its last chunk is being decrypted.
            this._receiveChain = this._receiveChain.then(async () => {
                if (generation !== this._receiveGeneration || this.dataChannel !== dc) return;
                try {
                    if (typeof data === 'string') {
                        if (data.length > 8192) throw new Error('制御データが大きすぎます');
                        const meta = JSON.parse(data);
                        if (meta.type === 'SESSION_KEY') {
                            if (this.customKeyString || this._isInitiator || this._sessionKey || !/^[a-f0-9]{64}$/.test(meta.key || '')) throw new Error('暗号化セッション情報が不正です');
                            this._sessionKey = meta.key;
                            this.cryptoKey = null;
                            dc.send(JSON.stringify({ type: 'SESSION_READY' }));
                            this.onStatusUpdate('channel_open');
                        } else if (meta.type === 'SESSION_READY') {
                            if (!this._isInitiator || !this._sessionKey) throw new Error('暗号化セッションが不正です');
                            this.onStatusUpdate('channel_open');
                        } else if (meta.type === 'file_header') {
                            if (this.incomingFileInfo || !Number.isSafeInteger(meta.size) || meta.size < 0 || meta.size > MAX_RECEIVE_BYTES ||
                                typeof meta.name !== 'string' || meta.name.length > 255 || typeof meta.encrypted !== 'boolean') {
                                throw new Error('受信ファイルの情報が不正、または64MiBの上限を超えています');
                            }
                            if (this.currentRoomId && this.isE2EEEnabled && !meta.encrypted) throw new Error('暗号化されていない受信を拒否しました');
                            this.resetReceiveBuffer();
                            this.incomingFileInfo = meta;
                            this.onProgress(0, meta.size, meta.name, 'rec');
                        } else if (meta.type === 'file_end') {
                            const info = this.incomingFileInfo;
                            if (!info || this.receivedSize !== info.size) throw new Error('ファイルの受信サイズが一致しません');
                            const blob = new Blob(this.receiveBuffer, { type: typeof info.mime === 'string' ? info.mime : 'application/octet-stream' });
                            this.resetReceiveBuffer();
                            this.onFileReceived(blob, this.sanitizeFilename(info.name), info.mode || 'WAN_P2P');
                            this.onStatusUpdate('remote_transfer_lock', false);
                        } else if (meta.type === 'TRANSFER_LOCK' || meta.type === 'TRANSFER_UNLOCK') {
                            this.onStatusUpdate('remote_transfer_lock', meta.type === 'TRANSFER_LOCK');
                        } else if (meta.type === 'EXPLICIT_DISCONNECT') {
                            this.disconnect();
                        }
                    } else {
                        const info = this.incomingFileInfo;
                        if (!info || queuedBytes > 65536) throw new Error('予期しない受信データです');
                        let buffer = data instanceof Blob ? await data.arrayBuffer() : data;
                        if (ArrayBuffer.isView(buffer)) buffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
                        if (!(buffer instanceof ArrayBuffer)) throw new Error('受信形式が不正です');
                        const payload = info.encrypted ? await this.decryptChunk(buffer) : buffer;
                        if (generation !== this._receiveGeneration) return;
                        if (payload.byteLength !== Math.min(32768, info.size - this.receivedSize) || payload.byteLength === 0) {
                            throw new Error('受信チャンクのサイズが不正です');
                        }
                        if (this.receivedSize + payload.byteLength > info.size) throw new Error('受信データが指定サイズを超えました');
                        this.receiveBuffer.push(payload);
                        this.receivedSize += payload.byteLength;
                        this.onProgress(this.receivedSize, info.size, info.name, 'rec');
                    }
                } catch (error) {
                    this.cleanupPeerConnection();
                    this.onStatusUpdate('channel_error', error);
                    this.onStatusUpdate('remote_transfer_lock', false);
                } finally {
                    if (generation === this._receiveGeneration) this._queuedReceiveBytes -= queuedBytes;
                }
            });
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
        const channel = this.dataChannel;
        if (!channel || channel.readyState !== 'open') {
            throw new Error("接続が確立されていません。送信先デバイスを選択または共有リンクで接続してください。");
        }

        if (file.size > MAX_RECEIVE_BYTES) throw new Error('省メモリのため1回の転送は64MiBまでです');
        channel.send(JSON.stringify({ type: 'TRANSFER_LOCK' }));

        try {
            const actualMode = await this.getConnectedTransportMode();
            if (this.dataChannel !== channel || channel.readyState !== 'open') throw new Error('転送先の接続が変更されました');
            const isEncrypted = !!this.isE2EEEnabled;

            // ★ WebRTC DataChannel の規格上限 (max-message-size) に 100% 抵触しない安全チャンクサイズ
            // 全ブラウザ (Chrome / Safari / Firefox / Edge) の SCTP 上限 (64KB / 256KB) を下回り、
            // AES-GCM 暗号化オーバーヘッド (28バイト: IV 12B + Tag 16B) を含めても 65,535 バイト未満に完全保証
            const CHUNK_SIZE = 32 * 1024; // 32,768 bytes

            // バックプレッシャー制御の閾値 (DataChannel バッファ溢れ・強制切断の根本防止)
            // OS / SCTP スタックのメモリ上限を超えないよう、512KB で待機、128KB で再開
            const BUFFER_HIGH = 512 * 1024;
            const BUFFER_LOW = 128 * 1024;

            channel.bufferedAmountLowThreshold = BUFFER_LOW;

            const header = {
                type: 'file_header',
                name: file.name,
                size: file.size,
                mime: file.type || 'application/octet-stream',
                mode: actualMode,
                encrypted: isEncrypted
            };

            if (this.dataChannel === channel && channel.readyState === 'open') {
                channel.send(JSON.stringify(header));
            } else {
                throw new Error("転送開始前に接続が切断されました。");
            }

            // 0バイトファイルの場合はヘッダーと終了通知のみで即時完了
            if (file.size === 0) {
                this.onProgress(0, 0, file.name, 'send');
                if (this.dataChannel === channel && channel.readyState === 'open') {
                    channel.send(JSON.stringify({ type: 'file_end' }));
                }
                return actualMode;
            }

            let offset = 0;
            const total = file.size;

            while (offset < total) {
                // 安全な接続オープンチェック
                if (this.dataChannel !== channel || channel.readyState !== 'open') {
                    throw new Error("転送中にP2P接続が切断されました。");
                }

                // 真のバックプレッシャー制御: バッファが過密になったら bufferedamountlow を確実に待機
                if (channel.bufferedAmount > BUFFER_HIGH) {
                    await new Promise((resolve, reject) => {
                        let timer = null;
                        const onLow = () => {
                            if (timer) clearTimeout(timer);
                            if (channel) {
                                channel.removeEventListener('bufferedamountlow', onLow);
                            }
                            resolve();
                        };
                        channel.addEventListener('bufferedamountlow', onLow, { once: true });
                        // 回線不通時のセーフティタイムアウト (15秒)
                        timer = setTimeout(() => {
                            if (channel) {
                                channel.removeEventListener('bufferedamountlow', onLow);
                            }
                            reject(new Error('転送タイムアウト: 相手端末へのデータ送信が停滞しました'));
                        }, 15000);
                    });
                }

                // 切断の二重チェック
                if (this.dataChannel !== channel || channel.readyState !== 'open') {
                    throw new Error("転送中にP2P接続が切断されました。");
                }

                const slice = file.slice(offset, offset + CHUNK_SIZE);
                const rawBuffer = await slice.arrayBuffer();

                let chunkToSend = rawBuffer;
                if (isEncrypted) {
                    chunkToSend = await this.encryptChunk(rawBuffer);
                }

                if (this.dataChannel !== channel || channel.readyState !== 'open') {
                    throw new Error("転送中にP2P接続が切断されました。");
                }

                try {
                    channel.send(chunkToSend);
                } catch (sendErr) {
                    console.warn("Send chunk warning, retrying after drain:", sendErr);
                    await new Promise(r => setTimeout(r, 50));
                    if (this.dataChannel !== channel || channel.readyState !== 'open') {
                        throw new Error("転送中にP2P接続が切断されました。");
                    }
                    channel.send(chunkToSend);
                }

                offset += rawBuffer.byteLength;
                this.onProgress(offset, total, file.name, 'send');
            }

            // 終了通知 (安全送信)
            if (this.dataChannel === channel && channel.readyState === 'open') {
                channel.send(JSON.stringify({ type: 'file_end' }));
            }
            return actualMode;
        } finally {
            if (this.dataChannel === channel) this.sendControlMessage({ type: 'TRANSFER_UNLOCK' });
        }
    }

    sanitizeFilename(name) {
        if (!name) return 'download_file';
        let clean = name.replace(/[\/\?%*:|"<>]/g, '_');
        clean = clean.replace(/\.\./g, '_');
        return clean.trim() || 'download_file';
    }
}
