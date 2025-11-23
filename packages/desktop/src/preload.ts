import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
    isDesktopUpdateAvailable: () => ipcRenderer.invoke('is-desktop-update-available'),
});

if (process.env.VITE_DEV_SERVER_URL) {
    console.log('Preload.ts says hello!');
    console.log('This will be visible in browser console.');
    console.log("It's DEV environment.");
}
