import { useState } from 'react';

export const UpdateControls = () => {
    const [availableUpdate, setAvailableUpdate] = useState<null | string>(null);
    const [checkingInProgress, setCheckingInProgress] = useState(false);

    const checkForUpdates = async () => {
        setCheckingInProgress(true);
        const latestVersion = await window.ipcRenderer.isDesktopUpdateAvailable();
        setAvailableUpdate(latestVersion);
        setCheckingInProgress(false);
    };

    return (
        <div>
            <p>
                Current version: {APP_VERSION}{' '}
                <button disabled={checkingInProgress} onClick={checkForUpdates}>
                    {checkingInProgress ? 'Checking updates.' : 'Check for updates!'}
                </button>
            </p>
            {availableUpdate ? (
                <p>
                    <b>{availableUpdate}</b> available for download! 🚀
                    <br />
                    todo implement UpdateNowButton...
                </p>
            ) : null}
        </div>
    );
};
