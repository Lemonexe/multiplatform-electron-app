import { defineConfig, type Plugin } from 'vite';
import { type ChildProcess, spawn } from 'node:child_process';
import electronPath from 'electron';
import path from 'node:path';

const entry = path.join('src', 'main.ts');
const outDir = 'dist-main';

export default defineConfig({
    build: {
        emptyOutDir: false,
        minify: false,
        ssr: true,
        outDir,
        assetsDir: '.',
        target: 'node22', // Electron 39 runs on Node 22.20 https://www.electronjs.org/blog/electron-39-0#stack-changes
        lib: {
            entry,
            formats: ['es'],
        },
        rollupOptions: {
            input: undefined, // don't parse index.html, it is not relevant for a Node.js script
            external: [], // list here all packages that cannot be bundled, but need a runtime `import()`. Tip: automatize it by parsing package.json
        },
    },
    publicDir: false, // no static assets for Node.js script
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    plugins: [electronPlugin()],
});

/**
 * Custom plugin that handles starting Electron in dev mode, as well as hot reloading when renderer process changes.
 * There are some libraries for this, but unnecessary - you can see how simple it is! Better than a black box for a simple demo :)
 * I'd argue that this is better even for a larger project, as it will likely have custom requirements, and this is easy to adapt.
 * Note: no hot reload for main/preload process. All it could theoretically do is restart Electron, as these changes cannot be hot reloaded.
 */
function electronPlugin(): Plugin {
    let electronApp: ChildProcess | null = null;
    let rendererWatchServer = null;

    return {
        name: 'electron-plugin',

        config(config, env) {
            if (env.mode !== 'development') return;

            const plugins = config.plugins as Plugin[];
            const provider = plugins.find(({ name }) => name === 'renderer-watch-server-provider');
            if (!provider) throw new Error('Renderer watch server provider not found');

            rendererWatchServer = provider.api.provideRendererWatchServer();
            // Pass the renderer vite dev server, so that electron-main can load the initial index.html in dev mode
            process.env.VITE_DEV_SERVER_URL = rendererWatchServer.resolvedUrls.local[0];

            return { build: { watch: {} } };
        },

        writeBundle() {
            if (process.env.NODE_ENV !== 'development') return;

            // Kill electron if a process already exists
            if (electronApp !== null) {
                electronApp.removeListener('exit', process.exit);
                electronApp.kill('SIGINT');
                electronApp = null;
            }

            // Spawn a new electron process
            electronApp = spawn(String(electronPath), ['--inspect', '.'], { stdio: 'inherit' });

            // Stops the watch script when the application has been quit
            electronApp.addListener('exit', process.exit);
        },
    };
}
