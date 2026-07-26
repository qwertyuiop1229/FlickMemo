import fs from 'fs';
import { execSync } from 'child_process';

try {
    // 1. Gitのステータスをチェックしてコード変更があるか判定
    const gitStatus = execSync('git status --porcelain').toString();

    const hasCodeChanges = gitStatus.split('\n').some(line => {
        const file = line.trim().split(/\s+/)[1];
        return file && !file.includes('version.json') && !file.includes('app.js');
    });

    if (!hasCodeChanges) {
        console.log("ℹ️ コードの変更がないため、version.json のバージョン数字は維持してデプロイします。");
    } else {
        // 2. マスターファイル version.json を読み込んで +1 カウントアップ
        const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
        const parts = versionData.version.split('.');
        parts[2] = parseInt(parts[2], 10) + 1; // パッチバージョンを +1
        const newVersion = parts.join('.');
        versionData.version = newVersion;
        fs.writeFileSync('version.json', JSON.stringify(versionData, null, 2));

        // 3. version.json から読み取った最新バージョンを app.js 内に同期埋め込み
        let appJsContent = fs.readFileSync('app.js', 'utf8');
        appJsContent = appJsContent.replace(
            /const APP_VERSION = "[^"]+";/,
            `const APP_VERSION = "${newVersion}";`
        );
        fs.writeFileSync('app.js', appJsContent);

        console.log(`⚡ version.json を参照して更新＆コードへ同期完了: v${newVersion}`);
    }
} catch (err) {
    console.error("バージョン更新エラー:", err);
}