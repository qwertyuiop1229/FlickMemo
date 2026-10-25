import { defineConfig } from 'vite';
// Desktop builds contain only the shared app, never the extension or auth helper.
export default defineConfig({
    base: '/',
    build: { outDir: 'dist-desktop', rollupOptions: { input: 'index.html' } },
    clearScreen: false
});
