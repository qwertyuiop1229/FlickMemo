import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

const copyExtensionFiles = () => ({
    name: 'copy-extension-files',
    closeBundle() {
        if (!fs.existsSync('dist/icons')) fs.mkdirSync('dist/icons', { recursive: true });
        if (fs.existsSync('manifest.json')) fs.copyFileSync('manifest.json', 'dist/manifest.json');
        if (fs.existsSync('manifest.webmanifest')) fs.copyFileSync('manifest.webmanifest', 'dist/manifest.webmanifest');
        if (fs.existsSync('background.js')) fs.copyFileSync('background.js', 'dist/background.js');
        if (fs.existsSync('version.json')) fs.copyFileSync('version.json', 'dist/version.json');
        if (fs.existsSync('icon.png')) fs.copyFileSync('icon.png', 'dist/icon.png');
        if (fs.existsSync('404.html')) fs.copyFileSync('404.html', 'dist/404.html');
        if (fs.existsSync('icons')) {
            fs.readdirSync('icons').forEach(file => {
                fs.copyFileSync(`icons/${file}`, `dist/icons/${file}`);
            });
        }
    }
});

// ビルド後に dist/index.html を後処理して iOS PWA 互換性を確保する
const fixiOSCompatibility = () => ({
    name: 'fix-ios-compatibility',
    // writeBundle は全ファイルが書き出された後に実行される（transformIndexHtml より確実）
    writeBundle() {
        const htmlPath = resolve(__dirname, 'dist/index.html');
        if (!fs.existsSync(htmlPath)) return;

        let html = fs.readFileSync(htmlPath, 'utf-8');

        // 1) <script> タグの crossorigin 属性を除去（iOS PWA での CORS エラー対策）
        html = html.replace(/<script([^>]*)\scrossorigin(?:="[^"]*")?\s*/gi, '<script$1 ');

        // 2) <link> タグ全般の crossorigin 属性を除去（modulepreload, stylesheet 共通）
        html = html.replace(/<link([^>]*)\scrossorigin(?:="[^"]*")?\s*/gi, '<link$1 ');

        // 3) Vite がハッシュ付きで書き換えたマニフェストのパスを元に戻す
        html = html.replace(
            /<link rel="manifest" href="[^"]*manifest-[^"]+\.webmanifest">/,
            '<link rel="manifest" href="/manifest.webmanifest">'
        );

        // 4) ./ で始まる assets パスを / 始まりの絶対パスに統一（iOS PWA の相対パス問題対策）
        html = html.replace(/href="\.\//g, 'href="/');
        html = html.replace(/src="\.\//g, 'src="/');

        fs.writeFileSync(htmlPath, html, 'utf-8');
        console.log('[fix-ios-compatibility] dist/index.html patched for iOS PWA.');
    }
});

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'index.html'),
                auth: resolve(__dirname, 'auth.html')
            },
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        }
    },
    plugins: [copyExtensionFiles(), fixiOSCompatibility()]
});