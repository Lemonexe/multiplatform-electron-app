import { useMemo, useState } from 'react';
import { Card } from '@packages/components/Card';
import logoElectron from './assets/logo-electron.svg';
import { UpdateControls } from './UpdateControls';
import { MainContent } from '@packages/app/MainContent.tsx';
import { AppStateContext } from '@packages/components/AppStateContext';
import { Layout } from '@packages/app/Layout.tsx';

export const DesktopApp = () => {
    const [counter, setCounter] = useState(0);
    const [desktopUpdateAvailable, setDesktopUpdateAvailable] = useState<string | undefined>(undefined);

    const providerData = useMemo(
        () => ({ counter, setCounter, desktopUpdateAvailable, setDesktopUpdateAvailable }),
        [counter, setCounter, desktopUpdateAvailable, setDesktopUpdateAvailable],
    );

    return (
        <AppStateContext.Provider value={providerData}>
            <Layout>
                <MainContent />

                <Card>
                    <img src={logoElectron} width="100px" height="100px" />

                    <div>
                        <h2>DesktopApp.tsx</h2>
                        <UpdateControls />
                    </div>
                </Card>
            </Layout>
        </AppStateContext.Provider>
    );
};
