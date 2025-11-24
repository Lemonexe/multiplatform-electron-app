import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/*
 The built directory structure:

 ├─┬ dist-main
 │ ├── main.js       (Electron-main)
 │ └── preload.cjs   (Electron-preload)
 ├─┬ dist-renderer
 │ └── index.html    (Electron-renderer entry point)
*/

// Note: packages/desktop/package.json expects the entry point to be at dist-main/main.js
// So that must be the vite output path. Note that in runtime, __dirname is packages/desktop/dist-main/
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const APP_ROOT = path.join(__dirname, '..'); // This is the root of the `resources/app.asar` (archive created by electron-builder)
const MAIN_DIST = path.join(APP_ROOT, 'dist-main');
const RENDERER_DIST = path.join(APP_ROOT, 'dist-renderer');
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL; // Exposed by vite.config.main.ts in dev mode. We're using it an indication of dev mode.
const indexHtmlPath = path.join(RENDERER_DIST, 'index.html');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, 'public') : RENDERER_DIST;

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let browserWindow: BrowserWindow | null = null;

let mockedAvailableMinorVersionForUpdate = 0;

async function createWindow() {
    browserWindow = new BrowserWindow({
        title: 'Main window',
        width: 1024,
        height: 768,
        icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            // nodeIntegration: true,
            // contextIsolation: false,
        },
    });

    if (VITE_DEV_SERVER_URL) {
        browserWindow.loadURL(VITE_DEV_SERVER_URL);
    } else {
        browserWindow.loadFile(indexHtmlPath);
    }

    // Custom Desktop IPC API for demo
    ipcMain.handle('is-desktop-update-available', async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        mockedAvailableMinorVersionForUpdate += 1;
        return `1.1.${mockedAvailableMinorVersionForUpdate}`;
    });
}

app.whenReady().then(createWindow);

app.on('second-instance', () => {
    if (browserWindow) {
        // Focus on the main window if the user tried to open another
        if (browserWindow.isMinimized()) browserWindow.restore();
        browserWindow.focus();
    }
});
