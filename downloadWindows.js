const button = document.getElementById('windows-download-link');
const label = document.getElementById('windows-version');
try {
    const response = await fetch('/windows/release.json', { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error('unavailable');
    const release = await response.json();
    if (release.schemaVersion !== 1 || !/^\d+\.\d+\.\d+$/.test(release.version || '') || !release.files?.['FlickMemo-Setup.exe']?.sha256?.match(/^[a-f0-9]{64}$/)) throw new Error('invalid release');
    button.href = '/windows/FlickMemo-Setup.exe'; button.download = 'FlickMemo-Setup.exe';
    button.removeAttribute('aria-disabled'); button.textContent = 'Windows版をダウンロード';
    label.textContent = `Windows x64 · v${release.version}`;
} catch {
    button.textContent = 'Windows版の配信を準備中';
}
