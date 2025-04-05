import { useMemo, useState } from 'react';
import { Card } from '@packages/components/Card';
import { App } from '@packages/app/App';
import { AppStateContext } from '@packages/components/AppStateContext';

export const WebApp = () => {
    const [counter, setCounter] = useState(0);

    const providerData = useMemo(() => ({ counter, setCounter }), [counter, setCounter]);

    return (
        <AppStateContext.Provider value={providerData}>
            <Card style={{ marginBottom: '1rem' }}>
                <div>
                    <h2>WebApp.tsx</h2>
                    Download Desktop app for more features!
                </div>
            </Card>

            <App />
        </AppStateContext.Provider>
    );
};
