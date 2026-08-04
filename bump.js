import fs from 'fs';

try {
    // マスターファイル version.json を読み込んで無条件で +1 カウントアップ
    const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
    const parts = versionData.version.split('.');
    parts[2] = parseInt(parts[2], 10) + 1; // パッチバージョンを +1
    const newVersion = parts.join('.');
    versionData.version = newVersion;
    fs.writeFileSync('version.json', JSON.stringify(versionData, null, 2));

    // app.js 内の APP_VERSION を同期書き換え
    if (fs.existsSync('app.js')) {
        let appJsContent = fs.readFileSync('app.js', 'utf8');
        appJsContent = appJsContent.replace(
            /const APP_VERSION = "[^"]+";/,
            `const APP_VERSION = "${newVersion}";`
        );
        fs.writeFileSync('app.js', appJsContent);
    }

    // package.json 内の version を同期書き換え
    if (fs.existsSync('package.json')) {
        const pkgData = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkgData.version = newVersion;
        fs.writeFileSync('package.json', JSON.stringify(pkgData, null, 4));
    }

    // manifest.json 内の version を同期書き換え
    if (fs.existsSync('manifest.json')) {
        const manifestData = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
        manifestData.version = newVersion;
        fs.writeFileSync('manifest.json', JSON.stringify(manifestData, null, 4));
    }

    console.log(`🚀 自動バージョンアップ＆全構成ファイル同期完了: v${newVersion}`);
} catch (err) {
    console.error("バージョン更新エラー:", err);
}