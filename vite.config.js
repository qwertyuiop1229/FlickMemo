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

const removeCssCrossorigin = () => ({
    name: 'remove-css-crossorigin',
    transformIndexHtml(html) {
        return html.replace(/(<link[^>]*rel="stylesheet"[^>]*)crossorigin(=("[^"]*"|'[^']*'|[^\s>]+))?\s*/gi, '$1 ');
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
    plugins: [copyExtensionFiles(), removeCssCrossorigin()]
});