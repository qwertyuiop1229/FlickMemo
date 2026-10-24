const MAX_IMAGE_BYTES = 16 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 8 * 1024 * 1024;
const MAX_TEXT_BYTES = 4 * 1024 * 1024;

function checkDimensions(width, height) {
    if (!width || !height || width > 8192 || height > 8192 || width * height > MAX_IMAGE_PIXELS) {
        throw new Error('画像が大きすぎてコピーできません。「保存」から元のファイルをダウンロードしてください');
    }
}

export async function normalizeImageToPng(blob, { env = globalThis, signal } = {}) {
    if (blob.size > MAX_IMAGE_BYTES) throw new Error('画像が大きすぎてコピーできません。「保存」を使用してください');
    const header = new Uint8Array(await blob.slice(0, 24).arrayBuffer());
    const isPng = [137, 80, 78, 71, 13, 10, 26, 10].every((byte, i) => header[i] === byte);
    if (blob.type === 'image/png' && !isPng) throw new Error('画像データが壊れています。両端を更新して元画像を送り直してください');
    if (isPng) {
        if (header.length < 24) throw new Error('PNGのデータが不完全です');
        const view = new DataView(header.buffer);
        checkDimensions(view.getUint32(16), view.getUint32(20));
    }
    if (signal?.aborted) throw new Error('画像コピーを中止しました');
    const url = env.URL.createObjectURL(blob);
    const img = new env.Image();
    let canvas, timer, abort;
    try {
        return await new Promise((resolve, reject) => {
            abort = () => reject(new Error('画像コピーを中止しました'));
            signal?.addEventListener('abort', abort, { once: true });
            timer = env.setTimeout(() => reject(new Error('画像の変換がタイムアウトしました。「保存」を使用してください')), 8000);
            img.onerror = () => reject(new Error('画像を読み込めません。元の画像を送り直すか「保存」を使用してください'));
            img.onload = () => {
                try {
                    checkDimensions(img.naturalWidth, img.naturalHeight);
                    canvas = env.document.createElement('canvas');
                    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
                    const context = canvas.getContext('2d');
                    if (!context) throw new Error('画像の変換機能を使用できません');
                    context.drawImage(img, 0, 0);
                    canvas.toBlob(png => {
                        if (!png || png.type !== 'image/png') reject(new Error('PNG形式への変換に失敗しました'));
                        else resolve(png);
                    }, 'image/png');
                } catch (error) { reject(error); }
            };
            img.src = url;
        });
    } finally {
        env.clearTimeout(timer);
        signal?.removeEventListener('abort', abort);
        img.onload = null; img.onerror = null; img.src = '';
        env.URL.revokeObjectURL(url);
        if (canvas) { canvas.width = 0; canvas.height = 0; }
    }
}

export async function copyClipboardFile(blob, { name = blob.name || 'file', env = globalThis } = {}) {
    const clipboard = env.navigator.clipboard;
    if (!clipboard) throw new Error('クリップボードを利用できません。「保存」を使用してください');
    const type = blob.type || '';
    const isImage = type.startsWith('image/') || /\.(png|jpe?g|gif|webp|bmp|ico|heic|avif)$/i.test(name);
    if (isImage) {
        if (!clipboard.write || !env.ClipboardItem) throw new Error('このブラウザでは画像コピーに対応していません。「保存」を使用してください');
        const controller = new env.AbortController();
        // Safari requires the write call inside the click gesture. Pass the
        // asynchronous conversion as ClipboardItem data instead of awaiting it.
        const png = normalizeImageToPng(blob, { env, signal: controller.signal });
        png.catch(() => {});
        try {
            await clipboard.write([new env.ClipboardItem({ 'image/png': png })]);
            return 'image';
        } finally {
            controller.abort();
            await png.catch(() => {});
        }
    }
    const isText = type.startsWith('text/') || /\.(txt|md|json|js|ts|py|html|css|csv|xml|ya?ml|log|sh|bat|c|cpp|h|java|kt|go|rs|sql)$/i.test(name);
    if (isText) {
        if (blob.size > MAX_TEXT_BYTES) throw new Error('テキストが大きすぎてコピーできません。「保存」を使用してください');
        if (clipboard.write && env.ClipboardItem) {
            await clipboard.write([new env.ClipboardItem({ 'text/plain': new env.Blob([blob], { type: 'text/plain' }) })]);
        } else if (clipboard.writeText) await clipboard.writeText(await blob.text());
        else throw new Error('テキストコピーを利用できません');
        return 'text';
    }
    // Most browsers cannot place arbitrary files into the OS file clipboard.
    // Do not silently substitute multi-megabyte base64 strings for a file.
    if (!clipboard.writeText) throw new Error('ファイルのコピーに対応していません。「保存」を使用してください');
    await clipboard.writeText(name);
    return 'filename';
}
