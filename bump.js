import fs from 'fs';

try {
    const data = JSON.parse(fs.readFileSync('version.json', 'utf8'));
    const parts = data.version.split('.');
    parts[2] = parseInt(parts[2], 10) + 1; // パッチバージョンを +1
    data.version = parts.join('.');

    fs.writeFileSync('version.json', JSON.stringify(data, null, 2));
    console.log(`⚡ バージョンを更新しました: v${data.version}`);
} catch (err) {
    console.error("version.json の更新に失敗しました:", err);
}