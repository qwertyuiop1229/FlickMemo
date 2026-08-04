import { getDatabase, ref, set, push, onValue, off, remove, get } from "firebase/database";

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
                console.log("🚀 DropZone Go Local Server Detected:", this.localGoServerUrl);
            }
        } catch (e) {
            this.localGoServerUrl = null;
        }
    }

    // Googleアカウントに紐づくマイデバイスのオンライン状態を登録・待機
    startDevicePresence() {
        const user = this.auth.currentUser;
        if (!user) return;

        const devRef = ref(this.db, `users/${user.uid}/devices/${this.deviceId}`);
        set(devRef, {
            id: this.deviceId,
            name: this.deviceName,
            online: true,
            updatedAt: Date.now()
        });

        // 相手からのシグナリング待機
        const signalingRef = ref(this.db, `users/${user.uid}/signaling/${this.deviceId}`);
        onValue(signalingRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.offer) {
                this.handleIncomingOffer(data.fromDeviceId, data.offer);
                remove(signalingRef);
            }
        });

        // 同一ユーザーのアクティブデバイス一覧監視
        const allDevicesRef = ref(this.db, `users/${user.uid}/devices`);
        onValue(allDevicesRef, (snapshot) => {
            const data = snapshot.val() || {};
            this.activeDevices = {};
            const now = Date.now();
            Object.keys(data).forEach(id => {
                if (id !== this.deviceId && (now - (data[id].updatedAt || 0) < 60000)) {
                    this.activeDevices[id] = data[id];
                }
            });
            this.onStatusUpdate('devices_updated', this.activeDevices);
        });
    }

    stopDevicePresence() {
        const user = this.auth.currentUser;
        if (!user) return;
        const devRef = ref(this.db, `users/${user.uid}/devices/${this.deviceId}`);
        remove(devRef);
    }

    // スマート自動判定ロジック (Smart Adaptive Selector)
    determineOptimalMode(targetDevice, file) {
        if (this.currentMode !== 'AUTO') {
            return this.currentMode;
        }

        // 1. ローカル Go サーバーが検出されている場合
        if (this.localGoServerUrl && file.size > 50 * 1024 * 1024) {
            return 'DROPZONE_LOCAL';
        }

        // 2. 受信側がオンラインかつ直接P2P可能
        if (targetDevice && targetDevice.online) {
            return 'LAN_P2P';
        }

        // 3. フォールバック: クラウドストレージ転送
        return 'CLOUD_RELAY';
    }

    // WebRTC ピア接続作成
    createPeerConnection(targetDeviceId) {
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
            console.log("ICE Connection State:", pc.iceConnectionState);
            if (pc.iceConnectionState === 'connected') {
                this.onStatusUpdate('p2p_connected', { targetDeviceId });
            } else if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
                this.onStatusUpdate('p2p_disconnected', { targetDeviceId });
            }
        };

        return pc;
    }

    // 接続開始（送信側）
    async connectToDevice(targetDeviceId) {
        const user = this.auth.currentUser;
        if (!user) throw new Error("ログインしてください");

        this.peerConnection = this.createPeerConnection(targetDeviceId);

        // DataChannelの生成
        this.dataChannel = this.peerConnection.createDataChannel("flickmemo_transfer", {
            ordered: true
        });

        this.setupDataChannelHandlers(this.dataChannel);

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);

        // シグナリング情報をFirebaseに書き込み
        const sigRef = ref(this.db, `users/${user.uid}/signaling/${targetDeviceId}`);
        await set(sigRef, {
            fromDeviceId: this.deviceId,
            offer: JSON.stringify(offer),
            timestamp: Date.now()
        });

        // Answer の受領待機
        const ansRef = ref(this.db, `users/${user.uid}/answers/${this.deviceId}`);
        onValue(ansRef, async (snapshot) => {
            const data = snapshot.val();
            if (data && data.answer) {
                const answer = JSON.parse(data.answer);
                if (this.peerConnection.signalingState !== 'stable') {
                    await this.peerConnection.setRemoteDescription(answer);
                }
                remove(ansRef);
            }
        });

        // Candidate の受領待機
        const candRef = ref(this.db, `users/${user.uid}/candidates/${this.deviceId}`);
        onValue(candRef, (snapshot) => {
            const data = snapshot.val() || {};
            Object.values(data).forEach(async (candStr) => {
                try {
                    const cand = JSON.parse(candStr);
                    await this.peerConnection.addIceCandidate(cand);
                } catch (e) {}
            });
            remove(candRef);
        });
    }

    // 接続要求受信（受信側）
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

        // Candidate 待機
        const candRef = ref(this.db, `users/${user.uid}/candidates/${this.deviceId}`);
        onValue(candRef, (snapshot) => {
            const data = snapshot.val() || {};
            Object.values(data).forEach(async (candStr) => {
                try {
                    const cand = JSON.parse(candStr);
                    await this.peerConnection.addIceCandidate(cand);
                } catch (e) {}
            });
            remove(candRef);
        });
    }

    // DataChannel イベント設定
    setupDataChannelHandlers(dc) {
        dc.binaryType = 'arraybuffer';

        dc.onopen = () => {
            console.log("DataChannel Open!");
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
        };
    }

    // 高速チャンク分割送信 (64KB ArrayBuffer Chunking with LowThreshold Backpressure)
    async sendFileP2P(file) {
        if (!this.dataChannel || this.dataChannel.readyState !== 'open') {
            throw new Error("P2P接続が確立されていません");
        }

        const CHUNK_SIZE = 64 * 1024; // 64KB
        const header = {
            type: 'file_header',
            name: file.name,
            size: file.size,
            mime: file.type || 'application/octet-stream'
        };

        this.dataChannel.send(JSON.stringify(header));

        const arrayBuffer = await file.arrayBuffer();
        let offset = 0;
        const total = arrayBuffer.byteLength;

        this.dataChannel.bufferedAmountLowThreshold = 256 * 1024; // 256KB

        const sendNextChunk = () => {
            while (offset < total) {
                if (this.dataChannel.bufferedAmount > 1024 * 1024) {
                    // バッファ溢れ防止
                    this.dataChannel.onbufferedamountlow = () => {
                        this.dataChannel.onbufferedamountlow = null;
                        sendNextChunk();
                    };
                    return;
                }

                const chunk = arrayBuffer.slice(offset, offset + CHUNK_SIZE);
                this.dataChannel.send(chunk);
                offset += chunk.byteLength;
                this.onProgress(offset, total, file.name, 'send');
            }

            // 送信完了ヘッダー
            this.dataChannel.send(JSON.stringify({ type: 'file_end' }));
        };

        sendNextChunk();
    }

    // セキュリティ：パス・トラバーサルおよびXSS防止ファイル名サニタイズ
    sanitizeFilename(name) {
        if (!name) return 'download_file';
        let clean = name.replace(/[\/\?%*:|"<>]/g, '_');
        clean = clean.replace(/\.\./g, '_');
        return clean.trim() || 'download_file';
    }
}
