import { PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <h1>Multiplatform Electron App demo</h1>
            <i>the header is shared in Layout.tsx</i>
        </div>
        {children}
        <Footer />
    </div>
);

const Footer = () => (
    <footer
        style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'gray',
            backgroundColor: 'white',
        }}
    >
        Released in 2025 on{' '}
        <a href="https://github.com/Lemonexe/multiplatform-electron-app" target="_blank">
            Github
        </a>
        <br />
        <i>the footer is shared in Layout.tsx</i>
    </footer>
);
