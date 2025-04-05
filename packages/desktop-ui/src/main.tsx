import React from 'react';
import ReactDOM from 'react-dom/client';

import { DesktopApp } from './DesktopApp';

// If you want to use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './nodeDemo'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DesktopApp />
    </React.StrictMode>,
);

postMessage({ payload: 'removeLoading' }, '*');
