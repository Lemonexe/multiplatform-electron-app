import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

/*
 This may be a bit confusing: vite expects that `index.html` is located directly in `root`.
 In this case we are executing vite from `packages/desktop`, but want to use its root in `packages/desktop-ui`.
 This is a workaround to keep renderer and main+preload separated.
 In this case, `desktop` is driving the entire build pipeline, but of course it could also be the other way around...
*/
const root = path.resolve('../desktop-ui');
const outDir = path.relative(root, '../desktop/dist-renderer');

export default defineConfig({
    root,

    /*
     Relative base is CRUCIAL for packaged app! That's because `index.html` is loaded via `file://`, but it isn't in its root.
     For example (Windows): file://C:/Program%20Files/MultiplatformElectronApp/resources/app.asar/dist/index.html
     Using paths like "/index.js" works on localhost or Web, where the path resolves relative to window.location.origin.
     But with file protocol, there is no origin, and "/index.js" resolves to "file://index.js" (not found).
    */
    base: './',

    resolve: {
        alias: {
            '@packages/app': path.join(root, '../app/src'),
            '@packages/types': path.join(root, '../types/src'),
            '@packages/components': path.join(root, '../components/src'),
        },
    },
    build: {
        emptyOutDir: true,
        outDir,
        minify: false,
        target: 'chrome142', // Electron 39 runs on Chromium 142 https://www.electronjs.org/blog/electron-39-0#stack-changes
    },
    plugins: [react()],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    cacheDir: path.resolve(__dirname, '../../node_modules/.vite'),
});
