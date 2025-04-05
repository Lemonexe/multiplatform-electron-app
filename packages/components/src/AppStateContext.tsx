import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { AppState } from '@packages/types/state';

type ContextType = AppState & { setCounter: Dispatch<SetStateAction<AppState['counter']>> };

export const AppStateContext = createContext<ContextType | null>(null);

export const useAppState = (): ContextType => {
    const currentCtx = useContext(AppStateContext);
    if (!currentCtx) throw new Error(`useAppState must be used within a AppStateContext.Provider`);
    return currentCtx;
};
