import { useMemo, useState } from 'react';
import { Card } from '@packages/components/Card';
import logoElectron from './assets/logo-electron.svg';
import { UpdateControls } from './UpdateControls';
import { App } from '@packages/app/App';
import { AppStateContext } from '@packages/components/AppStateContext';

export const DesktopApp = () => {
    const [counter, setCounter] = useState(0);
    const [desktopUpdateAvailable, setDesktopUpdateAvailable] = useState<string | undefined>(undefined);

    const providerData = useMemo(
        () => ({ counter, setCounter, desktopUpdateAvailable, setDesktopUpdateAvailable }),
        [counter, setCounter, desktopUpdateAvailable, setDesktopUpdateAvailable],
    );

    return (
        <AppStateContext.Provider value={providerData}>
            <Card style={{ marginBottom: '1rem' }}>
                <img src={logoElectron} width="100px" height="100px" />

                <div>
                    <h2>DesktopApp.tsx</h2>
                    <UpdateControls />
                </div>
            </Card>

            <App />
        </AppStateContext.Provider>
    );
};
