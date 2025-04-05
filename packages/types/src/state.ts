import { Dispatch, SetStateAction } from 'react';

export type AppState = {
    counter: number;
    setCounter: Dispatch<SetStateAction<number>>;
    desktopUpdateAvailable?: string;
    setDesktopUpdateAvailable?: Dispatch<SetStateAction<string | undefined>>;
};
