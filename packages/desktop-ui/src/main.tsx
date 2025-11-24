import React from 'react';
import ReactDOM from 'react-dom/client';

import { DesktopApp } from './DesktopApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DesktopApp />
    </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
