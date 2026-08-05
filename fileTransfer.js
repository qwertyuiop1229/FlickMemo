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

        this.isE2EEEnabled = true;
        this.isGuestMode = false;
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
            const keyMaterial = new TextEncoder().encode("FlickMemo_AES256_GCM_SecretKey_2026");
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
        if (!this.isE2EEEnabled) return buffer;
        try {
            const key = await this.generateEncryptionKey();
            const iv = buffer.slice(0, 12);
            const data = buffer.slice(12);
            return await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: new Uint8Array(iv) }, key, data);
        } catch (e) {
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
                this.handleIncomingOffer(data.fromDeviceId, data.offer, `users/${user.uid}`);
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
                this.handleIncomingOffer(data.fromDeviceId, data.offer, `public_rooms/${roomId}`);
                remove(roomSignalingRef).catch(() => {});
            }
        }, (err) => console.warn("Room signaling error:", err.message));
        this._roomUnsubscribers.push(unsubSignaling);

        // メンバー監視リスナー — 後から入った方がcaller
        const membersRef = ref(this.db, `public_rooms/${roomId}/members`);
        const unsubMembers = onValue(membersRef, (snapshot) => {
            // このルームIDが既に無効なら無視（leaveRoom後に遅れて発火する場合の防御）
            if (this.currentRoomId !== roomId) return;

            const members = snapshot.val() || {};
            const otherIds = Object.keys(members).filter(id => id !== this.deviceId);
            if (otherIds.length > 0) {
                const otherId = otherIds[0];
                const otherJoinedAt = members[otherId]?.joinedAt || 0;
                if (this._myJoinedAt > otherJoinedAt) {
                    // 既に接続試行中なら重複発火させない
                    if (!this._connectingTo) {
                        this._connectingTo = otherId;
                        this.onStatusUpdate('room_member_joined', { roomId, otherDeviceId: otherId });
                    }
                }
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

    resetReceiveBuffer() {
        if (this.receiveBuffer) {
            this.receiveBuffer.length = 0; // メモリを明示的に即時解放 (iOS Safari/PWA 対策)
        }
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.incomingFileInfo = null;
    }

    cleanupPeerConnection() {
        this._connectingTo = null;
        this.resetReceiveBuffer();
        if (this.dataChannel) {
            this.dataChannel.onclose = null;
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
        if (targetDevice && targetDevice.online) {
            return 'LAN_P2P';
        }
        return 'WAN_P2P';
    }

    createPeerConnection(targetDeviceId, basePath, mode = 'AUTO') {
        this.cleanupPeerConnection();

        // 手動でWebリレイ選択時は直接リレイを起動
        if (mode === 'WEB_RELAY') {
            this.initWebSocketRelayFallback(targetDeviceId, basePath);
            return null;
        }

        // モード別ネットワーク制御アルゴリズム
        let iceServers = [];
        if (mode === 'LAN_P2P') {
            // LAN限定モード: STUNを使わず完全ローカル(mDNS/プライベートIP)のみで接続
            iceServers = [];
        } else {
            // WAN / AUTO モード: Google STUNで別ネットワーク間のP2P接続を確立
            iceServers = [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ];
        }

        const config = { iceServers };
        const pc = new RTCPeerConnection(config);

        pc.onicecandidate = (event) => {
            if (event.candidate && targetDeviceId && basePath) {
                const candRef = ref(this.db, `${basePath}/candidates/${targetDeviceId}`);
                push(candRef, JSON.stringify(event.candidate));
            }
        };

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'connected') {
                this.cleanupSignalingData(basePath, targetDeviceId);
                this.onStatusUpdate('p2p_connected', { targetDeviceId });
            } else if (pc.iceConnectionState === 'failed') {
                this.cleanupSignalingData(basePath, targetDeviceId);
                console.warn("P2P接続が遮断されました。Zero-Storage WebSocketリレイへフォールバックします。");
                this.initWebSocketRelayFallback(targetDeviceId, basePath);
            } else if (pc.iceConnectionState === 'disconnected') {
                this.cleanupSignalingData(basePath, targetDeviceId);
                this.onStatusUpdate('p2p_disconnected', { targetDeviceId });
            }
        };

        return pc;
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
                        off(ansRef, 'value', handleAnswerSnapshot);
                        remove(ansRef);
                    }
                } catch (err) {
                    console.warn("setRemoteDescription skipped:", err.message);
                }
            }
        };
        onValue(ansRef, handleAnswerSnapshot);

        const candRef = ref(this.db, `${basePath}/candidates/${this.deviceId}`);
        onValue(candRef, (snapshot) => {
            const data = snapshot.val() || {};
            Object.values(data).forEach(async (candStr) => {
                try {
                    if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
                        const cand = JSON.parse(candStr);
                        await this.peerConnection.addIceCandidate(cand);
                    }
                } catch (e) {}
            });
        });
    }

    async handleIncomingOffer(fromDeviceId, offerStr, basePath) {
        const offer = JSON.parse(offerStr);
        this.peerConnection = this.createPeerConnection(fromDeviceId, basePath, this.currentMode);

        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannelHandlers(this.dataChannel);
        };

        await this.peerConnection.setRemoteDescription(offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        const ansRef = ref(this.db, `${basePath}/answers/${fromDeviceId}`);
        await set(ansRef, {
            fromDeviceId: this.deviceId,
            answer: JSON.stringify(answer),
            timestamp: Date.now()
        });

        const candRef = ref(this.db, `${basePath}/candidates/${this.deviceId}`);
        onValue(candRef, (snapshot) => {
            const data = snapshot.val() || {};
            Object.values(data).forEach(async (candStr) => {
                try {
                    if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
                        const cand = JSON.parse(candStr);
                        await this.peerConnection.addIceCandidate(cand);
                    }
                } catch (e) {}
            });
        });
    }

    setupDataChannelHandlers(dc) {
        dc.binaryType = 'arraybuffer';

        dc.onopen = () => {
            this.onStatusUpdate('channel_open');
        };

        dc.onmessage = async (event) => {
            if (typeof event.data === 'string') {
                try {
                    const meta = JSON.parse(event.data);
                    if (meta.type === 'file_header') {
                        this.incomingFileInfo = meta;
                        this.receiveBuffer = [];
                        this.receivedSize = 0;
                        this.onProgress(0, meta.size, meta.name, 'rec');
                    } else if (meta.type === 'file_end') {
                        const blob = new Blob(this.receiveBuffer, { type: this.incomingFileInfo.mime || 'application/octet-stream' });
                        const safeName = this.sanitizeFilename(this.incomingFileInfo.name);
                        const actualMode = this.incomingFileInfo.mode || 'LAN_P2P';
                        this.onFileReceived(blob, safeName, actualMode);
                        this.resetReceiveBuffer();
                        this.onStatusUpdate('remote_transfer_lock', false);
                    } else if (meta.type === 'TRANSFER_LOCK') {
                        this.onStatusUpdate('remote_transfer_lock', true);
                    } else if (meta.type === 'TRANSFER_UNLOCK') {
                        this.onStatusUpdate('remote_transfer_lock', false);
                    } else if (meta.type === 'EXPLICIT_DISCONNECT') {
                        this.cleanupPeerConnection();
                        this.onStatusUpdate('p2p_disconnected');
                    }
                } catch (e) {}
            } else if (event.data instanceof ArrayBuffer) {
                const decrypted = await this.decryptChunk(event.data);
                this.receiveBuffer.push(decrypted);
                this.receivedSize += decrypted.byteLength;
                if (this.incomingFileInfo) {
                    this.onProgress(this.receivedSize, this.incomingFileInfo.size, this.incomingFileInfo.name, 'rec');
                }
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

    // P2P 接続不可環境向け Zero-Storage WebSocket パイプリレイ
    initWebSocketRelayFallback(targetDeviceId, basePath) {
        if (this.wsRelay) return;
        try {
            // 無料標準 HTTPS (443番ポート) パイプソケット
            const relayUrl = `wss://relay.websocket.org/?room=${this.deviceId}_${targetDeviceId}`;
            this.wsRelay = new WebSocket(relayUrl);
            this.wsRelay.binaryType = 'arraybuffer';

            this.wsRelay.onopen = () => {
                this.isRelayMode = true;
                this.onStatusUpdate('p2p_connected', { targetDeviceId, isRelay: true });
            };

            this.wsRelay.onmessage = async (e) => {
                if (typeof e.data === 'string') {
                    const meta = JSON.parse(e.data);
                    if (meta.type === 'file_header') {
                        this.incomingFileInfo = meta;
                        this.resetReceiveBuffer();
                        this.onProgress(0, meta.size, meta.name, 'rec');
                    } else if (meta.type === 'file_end') {
                        const blob = new Blob(this.receiveBuffer, { type: this.incomingFileInfo.mime || 'application/octet-stream' });
                        const safeName = this.sanitizeFilename(this.incomingFileInfo.name);
                        const actualMode = this.incomingFileInfo.mode || 'WEB_RELAY';
                        this.onFileReceived(blob, safeName, actualMode);
                        this.resetReceiveBuffer();
                    }
                } else if (e.data instanceof ArrayBuffer) {
                    const decrypted = await this.decryptChunk(e.data);
                    this.receiveBuffer.push(decrypted);
                    this.receivedSize += decrypted.byteLength;
                    if (this.incomingFileInfo) {
                        this.onProgress(this.receivedSize, this.incomingFileInfo.size, this.incomingFileInfo.name, 'rec');
                    }
                }
            };
        } catch (err) {
            console.error("Relay Fallback Error:", err);
        }
    }

    async sendFileP2P(file, transferMode) {
        if (this.isGuestMode || !this.auth?.currentUser) {
            throw new Error("ファイルを送信するにはGoogleアカウントでのログインが必要です（ゲストは受信のみ利用可能）。");
        }

        const isP2POpen = this.dataChannel && this.dataChannel.readyState === 'open';
        const isRelayOpen = this.wsRelay && this.wsRelay.readyState === WebSocket.OPEN;

        if (!isP2POpen && !isRelayOpen) {
            throw new Error("接続が確立されていません。送信先デバイスを選択してください。");
        }

        this.sendControlMessage({ type: 'TRANSFER_LOCK' });

        try {
            // 実際の転送モード (リレイモード動作時は WEB_RELAY)
            const actualMode = isRelayOpen ? 'WEB_RELAY' : (transferMode || this.currentMode || 'LAN_P2P');

            // 最速化アルゴリズム: 動的ダイナミックチャンク (128KB ~ 256KB 可変拡張)
            const CHUNK_SIZE = file.size > 10 * 1024 * 1024 ? 256 * 1024 : 128 * 1024;
            const header = {
                type: 'file_header',
                name: file.name,
                size: file.size,
                mime: file.type || 'application/octet-stream',
                mode: actualMode
            };

            const sendData = (data) => {
                if (isP2POpen) this.dataChannel.send(data);
                else if (isRelayOpen) this.wsRelay.send(data);
            };

            sendData(JSON.stringify(header));

            let offset = 0;
            const total = file.size;

            if (isP2POpen) {
                this.dataChannel.bufferedAmountLowThreshold = 512 * 1024;
            }

            // 最速化: パイプライン・バックプレッシャーフロー制御
            while (offset < total) {
                if (isP2POpen && this.dataChannel.bufferedAmount > 2 * 1024 * 1024) {
                    await new Promise(resolve => {
                        this.dataChannel.onbufferedamountlow = () => {
                            this.dataChannel.onbufferedamountlow = null;
                            resolve();
                        };
                    });
                }

                const slice = file.slice(offset, offset + CHUNK_SIZE);
                const rawBuffer = await slice.arrayBuffer();
                const encryptedBuffer = await this.encryptChunk(rawBuffer);
                sendData(encryptedBuffer);

                offset += rawBuffer.byteLength;
                this.onProgress(offset, total, file.name, 'send');
            }

            sendData(JSON.stringify({ type: 'file_end' }));
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
