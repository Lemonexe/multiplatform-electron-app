import { useState } from 'react';
import { useAppState } from '@packages/components/AppStateContext';

export const UpdateControls = () => {
    const [availableUpdate, setAvailableUpdate] = useState<null | string>(null);
    const [checkingInProgress, setCheckingInProgress] = useState(false);

    const { setDesktopUpdateAvailable } = useAppState();

    const checkForUpdates = async () => {
        setCheckingInProgress(true);
        const timeoutToCancel = setTimeout(() => setCheckingInProgress(false), 1500);
        const latestVersion = await window.ipcRenderer.isDesktopUpdateAvailable();
        setAvailableUpdate(latestVersion);
        setDesktopUpdateAvailable?.(latestVersion);
        setCheckingInProgress(false);
        clearTimeout(timeoutToCancel);
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
