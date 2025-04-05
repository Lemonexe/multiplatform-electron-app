/// <reference types="vite/client" />

interface Window {
    // expose in the `electron/preload/index.ts`
    ipcRenderer: {
        isDesktopUpdateAvailable: () => Promise<string>;
    };
}

declare const APP_VERSION: string;
