const button = document.getElementById('windows-download-link');
const label = document.getElementById('windows-version');
try {
    const response = await fetch('/windows/release.json', { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
    if (!response.ok) throw new Error('unavailable');
    const release = await response.json();
    button.href = windowsInstallerUrl(release); button.download = 'FlickMemo-Setup.exe';
    button.rel = 'noopener noreferrer';
    button.removeAttribute('aria-disabled'); button.textContent = 'Windows版をダウンロード';
    label.textContent = `Windows x64 · v${release.version}`;
} catch {
    button.textContent = 'Windows版の配信を準備中';
}
import { windowsInstallerUrl } from './platform/windowsRelease.js';
