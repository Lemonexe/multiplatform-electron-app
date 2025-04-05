import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// See https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@packages/app': path.resolve('../app/src'),
            '@packages/types': path.resolve('../types/src'),
            '@packages/components': path.resolve('../components/src'),
        },
    },
    build: {
        emptyOutDir: true,
        minify: false,
    },
    plugins: [react()],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    cacheDir: path.resolve(__dirname, '../../node_modules/.vite'),
});
