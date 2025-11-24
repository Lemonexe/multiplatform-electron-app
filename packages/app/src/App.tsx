import logoVite from './assets/logo-vite.svg';
import logoReact from './assets/logo-react.svg';
import { Card } from '@packages/components/Card';
import { Counter } from './Counter.tsx';
import './style.css';

export const App = () => (
    <Card>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={logoVite} width="80px" height="80px" alt="vite" />
            <img src={logoReact} width="80px" height="80px" alt="react" />
        </div>
        <div style={{ padding: '1rem' }}>
            <h2>App.tsx</h2>
            <p>
                This is the common part, shared between Desktop &amp; Web.
                <br />
                Most of the app UI will likely be here.
            </p>
            <p>
                This demo was built using the{' '}
                <a href="https://github.com/cawa-93/vite-electron-builder/" target="_blank">
                    vite-electron-builder
                </a>{' '}
                template, check it out!
            </p>
            <Counter />
        </div>
    </Card>
);
