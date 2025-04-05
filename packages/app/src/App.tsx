import logoVite from './assets/logo-vite.svg';
import logoReact from './assets/logo-react.svg';
import { Card } from '@packages/components/Card';
import { Dashboard } from './Dashboard';

export const App = () => (
    <Card>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={logoVite} width="80px" height="80px" />
            <img src={logoReact} width="80px" height="80px" />
        </div>
        <div style={{ padding: '1rem' }}>
            <h2>App.tsx (the common part)</h2>
            <p>
                Built using the{' '}
                <a href="https://github.com/electron-vite/electron-vite-react" target="_blank">
                    electron-vite-react
                </a>{' '}
                template, check it out!
            </p>
            <Dashboard />
        </div>
    </Card>
);
