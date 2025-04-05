import { HTMLAttributes, PropsWithChildren } from 'react';

export const Card = ({ children, style, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
    <div
        style={{
            border: '1px solid black',
            display: 'flex',
            gap: '2rem',
            padding: '1rem',
            ...style,
        }}
        {...rest}
    >
        {children}
    </div>
);
