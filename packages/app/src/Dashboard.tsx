import { useAppState } from '@packages/components/AppStateContext';

export const Dashboard = () => {
    const { counter, setCounter, desktopUpdateAvailable } = useAppState();

    return (
        <>
            <h3>Dashboard</h3>
            <p>
                Counter is now {counter} <button onClick={() => setCounter((prev) => prev + 1)}>Add!</button>
            </p>
            {desktopUpdateAvailable ? (
                <p>You can update your app to {desktopUpdateAvailable} for an improved counter! ✨</p>
            ) : null}
        </>
    );
};
