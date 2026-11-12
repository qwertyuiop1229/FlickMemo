import { AUTH_ORIGIN } from '../authProtocol.js';
export function validShareUrl(value) {
    try { const url = new URL(value); return url.origin === AUTH_ORIGIN && !url.username && !url.password && url.pathname === '/' && [...url.searchParams.keys()].length === 1 && /^rm_[A-Za-z0-9_-]{32}$/.test(url.searchParams.get('room') || '') && /^key=[a-f0-9]{64}$/.test(url.hash.slice(1)); }
    catch { return false; }
}
export function setupShareQr({ doc = document, getUrl, loadEncoder = () => import('qrcode') }) {
    const button = doc.getElementById('btn-room-qr');
    const dialog = doc.createElement('dialog'); dialog.className = 'folder-dialog share-qr-dialog'; dialog.setAttribute('aria-label','共有リンクのQRコード');
    dialog.innerHTML = '<h2>QRコードで接続</h2><p>相手の端末のカメラで読み取ってください。共有相手だけに見せてください。</p><div class="share-qr-canvas"></div><p role="status"></p><div class="folder-dialog-actions"><button type="button" class="btn-secondary-sm">閉じる</button></div>';
    doc.body.append(dialog);
    const slot = dialog.querySelector('.share-qr-canvas'), status = dialog.querySelector('[role=status]');
    let generation = 0, displayed = null;
    function clear() { ++generation; if (displayed) displayed.width = displayed.height = 0; displayed = null; slot.replaceChildren(); }
    function reset() { if (dialog.open) dialog.close(); clear(); status.textContent = ''; }
    async function open() {
        const url = getUrl(); reset();
        if (!validShareUrl(url)) { dialog.showModal(); status.textContent = '共有リンクを発行し直してください。'; return; }
        const ticket = generation; dialog.showModal(); status.textContent = 'QRコードを作成しています…';
        const canvas = doc.createElement('canvas'); canvas.setAttribute('role','img'); canvas.setAttribute('aria-label','共有リンクのQRコード');
        try {
            const module = await loadEncoder();
            if (ticket !== generation || getUrl() !== url || !dialog.open) return;
            await (module.default || module).toCanvas(canvas,url,{width:280,margin:4,errorCorrectionLevel:'M',color:{dark:'#161616',light:'#ffffff'}});
            if (ticket !== generation || getUrl() !== url || !dialog.open) return;
            displayed = canvas; slot.replaceChildren(canvas); status.textContent = 'このQRコードから、同じ共有リンクに接続できます。';
        } catch { if (ticket === generation && dialog.open) status.textContent = 'QRコードを作成できませんでした。共有リンクのコピーをご利用ください。'; }
        finally { if (displayed !== canvas) canvas.width = canvas.height = 0; }
    }
    button?.addEventListener('click',open); dialog.querySelector('button').onclick = () => dialog.close(); dialog.addEventListener('close',()=>{if(!dialog.open)clear();});
    return { open, reset, dialog };
}
