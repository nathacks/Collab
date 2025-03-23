import { useEffect } from 'react';

export function useKeyPressed(callbackKey: (e: KeyboardEvent) => boolean, callback: () => void) {
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (callbackKey(e)) {
                e.preventDefault();
                callback()
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [callback]);
}
