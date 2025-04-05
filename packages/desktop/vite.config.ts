import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import pkg from './package.json';
import renderer from 'vite-plugin-electron-renderer';

// For renderer process, `vite` starts at index.html, and that must always be found in the project root.
// This is a workaround to keep renderer and main+preload separated:
const rendererRoot = path.resolve('../desktop-ui');
const mainRoot = path.relative(rendererRoot, '../desktop/src');
const mainEntryPoint = path.join(mainRoot, 'main.ts');
const preloadEntryPoint = path.join(mainRoot, 'preload.ts');

const rendererOutDir = path.relative(rendererRoot, '../desktop/dist');
const mainOutDir = path.relative(rendererRoot, '../desktop/dist-electron');

// See https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@packages/app': path.join(rendererRoot, '../app/src'),
            '@packages/types': path.join(rendererRoot, '../types/src'),
            '@packages/components': path.join(rendererRoot, '../components/src'),
        },
    },
    root: rendererRoot,
    build: {
        outDir: rendererOutDir,
        minify: false,
    },
    plugins: [
        react(),
        electron([
            {
                // Main-Process entry file of the Electron App.
                entry: mainEntryPoint,
                vite: {
                    build: {
                        outDir: mainOutDir,
                        rollupOptions: {
                            // @ts-expect-error when dependencies empty..
                            external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                        },
                    },
                },
            },
            {
                entry: preloadEntryPoint,
                // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete instead of restarting the entire Electron App.
                onstart: (options) => options.reload(),
                vite: {
                    build: {
                        outDir: mainOutDir,
                        rollupOptions: {
                            // @ts-expect-error when dependencies empty..
                            external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
                        },
                        lib: {
                            // preload ESM is not yet fully supported, so we have to build as CJS
                            // see https://www.electronjs.org/docs/latest/tutorial/esm#summary-esm-support-matrix
                            entry: preloadEntryPoint,
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
    cacheDir: path.resolve(__dirname, '../../node_modules/.vite'),
});
