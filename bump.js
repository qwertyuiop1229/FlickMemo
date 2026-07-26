import fs from 'fs';

try {
    // 1. version.json を読み込んでインクリメント
    const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
    const parts = versionData.version.split('.');
    parts[2] = parseInt(parts[2], 10) + 1; // パッチバージョンを +1
    const newVersion = parts.join('.');
    versionData.version = newVersion;
    fs.writeFileSync('version.json', JSON.stringify(versionData, null, 2));

    // 2. app.js 内の const APP_VERSION = "..."; を直接書き換える
    let appJsContent = fs.readFileSync('app.js', 'utf8');
    appJsContent = appJsContent.replace(
        /const APP_VERSION = "[^"]+";/,
        `const APP_VERSION = "${newVersion}";`
    );
    fs.writeFileSync('app.js', appJsContent);

    console.log(`⚡ バージョンを更新＆コードに埋め込みました: v${newVersion}`);
} catch (err) {
    console.error("バージョン更新エラー:", err);
}