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

// iOS Safari が crossorigin 属性付きの CSS を拒否する問題を防ぐ
// manifest の href をハッシュなしパスに書き換える
const fixiOSCompatibility = () => ({
    name: 'fix-ios-compatibility',
    transformIndexHtml(html) {
        // CSS の link タグから crossorigin 属性を除去
        html = html.replace(/<link([^>]*rel=["']stylesheet["'][^>]*)crossorigin(?:=["'][^"']*["'])?\s*/gi, '<link$1');
        // Vite がハッシュ付きで書き換えたマニフェストのパスを元に戻す
        html = html.replace(
            /<link rel="manifest" href="\.\/assets\/manifest-[^"]+\.webmanifest">/,
            '<link rel="manifest" href="./manifest.webmanifest">'
        );
        return html;
    }
});

export default defineConfig({
    base: './',
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