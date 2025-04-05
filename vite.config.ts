import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import pkg from './package.json';
import renderer from 'vite-plugin-electron-renderer';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    build: {
        minify: false,
    },
    plugins: [
        react(),
        electron([
            {
                // Main-Process entry file of the Electron App.
                entry: 'electron/main.ts',
                vite: {
                    build: {
                        rollupOptions: {
                            external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                        },
                    },
                },
            },
            {
                entry: 'electron/preload.ts',
                // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete instead of restarting the entire Electron App.
                onstart: (options) => options.reload(),
                vite: {
                    build: {
                        rollupOptions: {
                            external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                        },
                        lib: {
                            // preload ESM is not yet fully supported, so we have to build as CJS
                            // see https://www.electronjs.org/docs/latest/tutorial/esm#summary-esm-support-matrix
                            entry: 'electron/preload.ts',
                            formats: ['cjs'],
                        },
                    },
                },
            },
        ]),
        renderer(),
    ],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
});
