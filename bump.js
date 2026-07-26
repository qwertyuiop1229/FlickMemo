import fs from 'fs';
import { execSync } from 'child_process';

try {
    // 1. Gitのステータスをチェックして、コード変更があるか判定
    const gitStatus = execSync('git status --porcelain').toString();

    const hasCodeChanges = gitStatus.split('\n').some(line => {
        const file = line.trim().split(/\s+/)[1];
        return file && !file.includes('version.json') && !file.includes('app.js');
    });

    if (!hasCodeChanges) {
        console.log("ℹ️ コードの変更がないため、バージョン数字は維持してデプロイします。");
    } else {
        // 2. version.json をインクリメント
        const versionData = JSON.parse(fs.readFileSync('version.json', 'utf8'));
        const parts = versionData.version.split('.');
        parts[2] = parseInt(parts[2], 10) + 1; // パッチバージョンを +1
        const newVersion = parts.join('.');
        versionData.version = newVersion;
        fs.writeFileSync('version.json', JSON.stringify(versionData, null, 2));

        // 3. app.js 内の const APP_VERSION = "..."; を直接書き換える
        let appJsContent = fs.readFileSync('app.js', 'utf8');
        appJsContent = appJsContent.replace(
            /const APP_VERSION = "[^"]+";/,
            `const APP_VERSION = "${newVersion}";`
        );
        fs.writeFileSync('app.js', appJsContent);

        console.log(`⚡ コード変更を検知！バージョンを更新しました: v${newVersion}`);
    }
} catch (err) {
    console.error("バージョン判定エラー:", err);
}