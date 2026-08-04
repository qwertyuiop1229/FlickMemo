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

        this.initLocalGoServerCheck();
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
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 800);
            const res = await fetch('http://localhost:8080/api/info', { signal: controller.signal });
            clearTimeout(timeoutId);
            if (res.ok) {
                const data = await res.json();
                this.localGoServerUrl = data.url || 'http://localhost:8080';
            }
        } catch (e) {
            this.localGoServerUrl = null;
        }
    }

    startDevicePresence() {
        const user = this.auth.currentUser;
        if (!user) return;

        const devRef = ref(this.db, `users/${user.uid}/devices/${this.deviceId}`);
        const signalingRef = ref(this.db, `users/${user.uid}/signaling/${this.deviceId}`);
        const answersRef = ref(this.db, `users/${user.uid}/answers/${this.deviceId}`);

        // ★ 切断時（タブ閉鎖・ネット切断・リロード時）の自動削除設定
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

        // 10秒おきの定期ハートビート（生存確認）
        clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(updatePresence, 10000);

        // 相手からのシグナリング待機
        onValue(signalingRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.offer) {
                this.handleIncomingOffer(data.fromDeviceId, data.offer);
                remove(signalingRef);
            }
        });

        // 同一ユーザーのアクティブデバイス一覧監視 (25秒以上更新のないノードは自動除外)
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
                    // 古い残存ノードをクリーンアップ
                    remove(ref(this.db, `users/${user.uid}/devices/${id}`));
                }
            });
            this.onStatusUpdate('devices_updated', this.activeDevices);
        });
    }

    stopDevicePresence() {
        clearInterval(this.heartbeatTimer);
        const user = this.auth.currentUser;
        if (user) {
            const devRef = ref(this.db, `users/${user.uid}/devices/${this.deviceId}`);
            const signalingRef = ref(this.db, `users/${user.uid}/signaling/${this.deviceId}`);
            const answersRef = ref(this.db, `users/${user.uid}/answers/${this.deviceId}`);
            const candidatesRef = ref(this.db, `users/${user.uid}/candidates/${this.deviceId}`);
            remove(devRef);
            remove(signalingRef);
            remove(answersRef);
            remove(candidatesRef);
        }
        this.cleanupPeerConnection();
    }

    cleanupPeerConnection() {
        if (this.dataChannel) {
            try { this.dataChannel.close(); } catch (e) {}
            this.dataChannel = null;
        }
        if (this.peerConnection) {
            try { this.peerConnection.close(); } catch (e) {}
            this.peerConnection = null;
        }
        this.receiveBuffer = [];
        this.receivedSize = 0;
        this.incomingFileInfo = null;
    }

    determineOptimalMode(targetDevice, file) {
        if (this.currentMode !== 'AUTO') {
            return this.currentMode;
        }
        if (this.localGoServerUrl && file.size > 50 * 1024 * 1024) {
            return 'DROPZONE_LOCAL';
        }
        if (targetDevice && targetDevice.online) {
            return 'LAN_P2P';
        }
        return 'CLOUD_RELAY';
    }

    createPeerConnection(targetDeviceId) {
        this.cleanupPeerConnection();

        const config = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };

        const pc = new RTCPeerConnection(config);

        pc.onicecandidate = (event) => {
            if (event.candidate && targetDeviceId) {
                const user = this.auth.currentUser;
                if (!user) return;
                const candRef = ref(this.db, `users/${user.uid}/candidates/${targetDeviceId}`);
                push(candRef, JSON.stringify(event.candidate));
            }
        };

        pc.oniceconnectionstatechange = () => {
            if (pc.iceConnectionState === 'connected') {
                this.onStatusUpdate('p2p_connected', { targetDeviceId });
            } else if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
                this.onStatusUpdate('p2p_disconnected', { targetDeviceId });
            }
        };

        return pc;
    }

    async connectToDevice(targetDeviceId) {
        const user = this.auth.currentUser;
        if (!user) throw new Error("ログインしてください");

        this.peerConnection = this.createPeerConnection(targetDeviceId);

        this.dataChannel = this.peerConnection.createDataChannel("flickmemo_transfer", {
            ordered: true
        });

        this.setupDataChannelHandlers(this.dataChannel);

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        const sigRef = ref(this.db, `users/${user.uid}/signaling/${targetDeviceId}`);
        await set(sigRef, {
            fromDeviceId: this.deviceId,
            offer: JSON.stringify(offer),
            timestamp: Date.now()
        });

        const ansRef = ref(this.db, `users/${user.uid}/answers/${this.deviceId}`);
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

        const candRef = ref(this.db, `users/${user.uid}/candidates/${this.deviceId}`);
        const handleCandSnapshot = (snapshot) => {
            const data = snapshot.val() || {};
            Object.values(data).forEach(async (candStr) => {
                try {
                    if (this.peerConnection && this.peerConnection.signalingState !== 'closed') {
                        const cand = JSON.parse(candStr);
                        await this.peerConnection.addIceCandidate(cand);
                    }
                } catch (e) {}
            });
        };
        onValue(candRef, handleCandSnapshot);
    }

    async handleIncomingOffer(fromDeviceId, offerStr) {
        const user = this.auth.currentUser;
        if (!user) return;

        const offer = JSON.parse(offerStr);
        this.peerConnection = this.createPeerConnection(fromDeviceId);

        this.peerConnection.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannelHandlers(this.dataChannel);
        };

        await this.peerConnection.setRemoteDescription(offer);
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);

        const ansRef = ref(this.db, `users/${user.uid}/answers/${fromDeviceId}`);
        await set(ansRef, {
            fromDeviceId: this.deviceId,
            answer: JSON.stringify(answer),
            timestamp: Date.now()
        });

        const candRef = ref(this.db, `users/${user.uid}/candidates/${this.deviceId}`);
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

        dc.onmessage = (event) => {
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
                        this.onFileReceived(blob, safeName);
                        // 即時メモリ解放（GC促進）
                        this.receiveBuffer = [];
                        this.receivedSize = 0;
                        this.incomingFileInfo = null;
                    }
                } catch (e) {}
            } else if (event.data instanceof ArrayBuffer) {
                this.receiveBuffer.push(event.data);
                this.receivedSize += event.data.byteLength;
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

    async sendFileP2P(file) {
        if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
            throw new Error("P2P接続が確立されていません。送信先デバイスを選択してください。");
        }

        const CHUNK_SIZE = 64 * 1024;
        const header = {
            type: 'file_header',
            name: file.name,
            size: file.size,
            mime: file.type || 'application/octet-stream'
        };

        this.dataChannel.send(JSON.stringify(header));

        let offset = 0;
        const total = file.size;

        this.dataChannel.bufferedAmountLowThreshold = 256 * 1024;

        const readAndSendChunk = async () => {
            while (offset < total) {
                if (this.dataChannel.bufferedAmount > 1024 * 1024) {
                    await new Promise(resolve => {
                        this.dataChannel.onbufferedamountlow = () => {
                            this.dataChannel.onbufferedamountlow = null;
                            resolve();
                        };
                    });
                }

                const slice = file.slice(offset, offset + CHUNK_SIZE);
                const buffer = await slice.arrayBuffer();
                this.dataChannel.send(buffer);

                offset += buffer.byteLength;
                this.onProgress(offset, total, file.name, 'send');
            }

            this.dataChannel.send(JSON.stringify({ type: 'file_end' }));
        };

        await readAndSendChunk();
    }

    sanitizeFilename(name) {
        if (!name) return 'download_file';
        let clean = name.replace(/[\/\?%*:|"<>]/g, '_');
        clean = clean.replace(/\.\./g, '_');
        return clean.trim() || 'download_file';
    }
}
