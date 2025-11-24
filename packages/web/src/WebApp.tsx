import { useMemo, useState } from 'react';
import { Card } from '@packages/components/Card';
import { App } from '@packages/app/App.tsx';
import { AppStateContext } from '@packages/components/AppStateContext';
import { Layout } from '@packages/app/Layout.tsx';

export const WebApp = () => {
    const [counter, setCounter] = useState(0);

    const providerData = useMemo(() => ({ counter, setCounter }), [counter, setCounter]);

    return (
        <AppStateContext.Provider value={providerData}>
            <Layout>
                <App />

                <Card style={{ marginBottom: '1rem' }}>
                    <div>
                        <h2>WebApp.tsx</h2>
                        <p>Download Desktop app for more features!</p>
                        <p>So we can bother you with app updates 😜</p>
                    </div>
                </Card>
            </Layout>
        </AppStateContext.Provider>
    );
};
