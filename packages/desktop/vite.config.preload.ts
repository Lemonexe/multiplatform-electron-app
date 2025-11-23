import { defineConfig } from 'vite';
import path from 'node:path';

const entry = path.join('src', 'preload.ts');
const outDir = 'dist-main'; // shared with `main`, because they are conceptually closely related

export default defineConfig({
    build: {
        emptyOutDir: false,
        minify: false,
        ssr: true,
        outDir,
        assetsDir: '.',
        target: 'chrome142', // Electron 39 runs on Chromium 142 https://www.electronjs.org/blog/electron-39-0#stack-changes
        lib: {
            entry,
            // ESM not supported for sandboxed & isolated preload https://www.electronjs.org/docs/latest/tutorial/esm#summary-esm-support-matrix
            formats: ['cjs'],
        },
        rollupOptions: {
            input: undefined, // don't parse index.html, it is not relevant for a Node.js script
            external: [], // list here all packages that cannot be bundled, but need a runtime `require()`. Tip: automatize it by parsing package.json
        },
    },
    publicDir: false, // no static assets for Node.js script
});
