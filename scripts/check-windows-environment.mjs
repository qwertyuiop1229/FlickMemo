import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
const cargo = existsSync(join(process.env.USERPROFILE || '', '.cargo/bin/cargo.exe'))
    ? join(process.env.USERPROFILE, '.cargo/bin/cargo.exe') : 'cargo';
for (const [name, executable, args] of [['Node', process.execPath, ['--version']], ['Rust / Cargo', cargo, ['--version']]]) {
    const result = spawnSync(executable, args, { encoding: 'utf8' });
    console.log(`${name}: ${result.status === 0 ? result.stdout.trim() : '見つかりません'}`);
}
const vswhere = join(process.env['ProgramFiles(x86)'] || '', 'Microsoft Visual Studio/Installer/vswhere.exe');
const cpp = existsSync(vswhere) ? spawnSync(vswhere, ['-latest', '-products', '*', '-requires', 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64', '-property', 'installationPath'], { encoding: 'utf8' }) : null;
if (!cpp?.stdout.trim()) {
    console.error('C++ビルドツールが不足しています。Visual Studio Build Toolsで「C++によるデスクトップ開発」とWindows SDKを追加してください。');
    console.error('公式手順: https://v2.tauri.app/start/prerequisites/#windows');
    process.exitCode = 1;
} else console.log(`C++ Build Tools: ${cpp.stdout.trim()}`);
