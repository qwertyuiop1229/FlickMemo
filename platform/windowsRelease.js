const REPOSITORY = 'qwertyuiop1229/FlickMemo';
export function windowsInstallerUrl(release) {
    const file = release?.files?.['FlickMemo-Setup.exe'];
    if (release?.schemaVersion !== 1 || release.repository !== REPOSITORY ||
        !/^\d+\.\d+\.\d+$/.test(release.version || '') ||
        !/^[a-f0-9]{40}$/.test(release.commit || '') ||
        !/^[a-f0-9]{64}$/.test(file?.sha256 || '') ||
        !Number.isSafeInteger(file?.bytes) || file.bytes <= 0 || file.bytes > 64 * 1024 * 1024) {
        throw new Error('Windows release metadata is invalid');
    }
    return `https://github.com/${REPOSITORY}/releases/download/v${release.version}/FlickMemo-Setup.exe`;
}
