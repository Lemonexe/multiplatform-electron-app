import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('ipcRenderer', {
    isDesktopUpdateAvailable: () => ipcRenderer.invoke('is-desktop-update-available'),
});
