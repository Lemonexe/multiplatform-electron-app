import { Card } from '@packages/components/Card';
import logoElectron from './assets/logo-electron.svg';
import { UpdateControls } from './UpdateControls';
import { App } from '@packages/app/App';

export const DesktopApp = () => {
    return (
        <>
            <Card style={{ marginBottom: '1rem' }}>
                <img src={logoElectron} width="100px" height="100px" />

                <div>
                    <h2>DesktopApp.tsx</h2>
                    <UpdateControls />
                </div>
            </Card>
            <App />
        </>
    );
};
