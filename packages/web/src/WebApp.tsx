import { Card } from '@packages/components/Card';
import { App } from '@packages/app/App';

export const WebApp = () => {
    return (
        <>
            <Card style={{ marginBottom: '1rem' }}>
                <div>
                    <h2>WebApp.tsx</h2>
                    Download Desktop app for more features!
                </div>
            </Card>
            <App />
        </>
    );
};
