import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

const copyExtensionFiles = () => ({
    name: 'copy-extension-files',
    closeBundle() {
        if (!fs.existsSync('dist/icons')) fs.mkdirSync('dist/icons', { recursive: true });
        if (fs.existsSync('manifest.json')) fs.copyFileSync('manifest.json', 'dist/manifest.json');
        if (fs.existsSync('background.js')) fs.copyFileSync('background.js', 'dist/background.js');
        if (fs.existsSync('icons')) {
            fs.readdirSync('icons').forEach(file => {
                fs.copyFileSync(`icons/${file}`, `dist/icons/${file}`);
            });
        }
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
    plugins: [copyExtensionFiles()]
});