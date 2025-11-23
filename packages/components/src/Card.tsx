import { HTMLAttributes, PropsWithChildren } from 'react';

export const Card = ({ children, style, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div
        style={{
            zIndex: 99,
            alignSelf: 'center',
            width: 'fit-content',
            backgroundColor: 'white',
            border: '1px solid grey',
            display: 'flex',
            gap: '1rem',
            padding: '0.5rem',
            margin: '0.5rem',
            boxShadow: '8px 8px 8px rgba(0,0,0,0.3)',
            ...style,
        }}
        {...rest}
    >
        {children}
    </div>
);
