import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// The built directory structure:
//
// ├─┬ dist-electron
// │ ├── index.js      > Electron-Main
// │ └── preload.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer entry point
//
// To explain: packages/desktop/package.json expects the entry point: dist-electron/index.js
// That is the path where vite builds Electron Main bundle. Therefore,
// __dirname = packages/desktop/dist-electron/
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, '..');
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

if (!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

let browserWindow: BrowserWindow | null = null;
const indexHtml = path.join(RENDERER_DIST, 'index.html');

let mockedAvailableMinorVersionForUpdate = 0;

async function createWindow() {
    browserWindow = new BrowserWindow({
        title: 'Main window',
        icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // Warning: Enabling nodeIntegration and disabling contextIsolation is not secure in production
            // nodeIntegration: true,
            // contextIsolation: false,
            // means that preload scope is shared with renderer. By default, you can only pass things to renderer via contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
        },
    });

    if (VITE_DEV_SERVER_URL) {
        browserWindow.loadURL(VITE_DEV_SERVER_URL);
        // Open devTool if the app is not packaged
        browserWindow.webContents.openDevTools();
    } else {
        browserWindow.loadFile(indexHtml);
    }

    // Make all links open with the browser, not with the application
    browserWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https:')) shell.openExternal(url);
        return { action: 'deny' };
    });

    ipcMain.handle('is-desktop-update-available', async () => {
        await new Promise((resolve) => setTimeout(resolve, 700));
        mockedAvailableMinorVersionForUpdate += 1;
        return `1.1.${mockedAvailableMinorVersionForUpdate}`;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    browserWindow = null;
    if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', () => {
    if (browserWindow) {
        // Focus on the main window if the user tried to open another
        if (browserWindow.isMinimized()) browserWindow.restore();
        browserWindow.focus();
    }
});

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
        allWindows[0].focus();
    } else {
        createWindow();
    }
});
