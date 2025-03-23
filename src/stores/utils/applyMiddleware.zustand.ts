import { StateCreator } from 'zustand';

type StoreValueSetter<State> = {
    (
        partial:
            | State
            | Partial<State>
            | ((state: State) => State | Partial<State>),
        replace?: false
    ): void;
    (state: State | ((state: State) => State), replace: true): void;
};

export type Middleware<State> = (
    action: string,
    set: StoreValueSetter<State>,
    get: () => State
) => void;

export default function applyMiddleware<State extends object>({
                                                                  store,
                                                                  beforeMiddlware,
                                                                  afterMiddlware,
                                                                  excludeActions = []
                                                              }: {
    store: StateCreator<State, [], []>;
    beforeMiddlware?: Middleware<State>;
    afterMiddlware?: Middleware<State>;
    excludeActions?: (keyof State)[];
}): StateCreator<State, [], []> {
    return (set, get, storeApi) => {
        /** Wrap each store action with middleware: beforeMiddleware runs before, afterMiddleware runs after the action executes. */
        function storeWrapper<P extends unknown[], R>(
            fn: (...args: P) => R,
            actionName: string
        ): (...args: P) => R {
            return (...args: P): R => {
                if (excludeActions.includes(actionName as keyof State)) {
                    return fn(...args);
                }

                beforeMiddlware?.(actionName, set, get);
                const result = fn(...args);
                afterMiddlware?.(actionName, set, get);
                return result;
            };
        }

        const initializedStore = store(set, get, storeApi);

        for (const key in initializedStore) {
            if (Object.prototype.hasOwnProperty.call(initializedStore, key)) {
                if (typeof initializedStore[key] === 'function') {
                    initializedStore[key] = storeWrapper(
                        initializedStore[key] as (...args: unknown[]) => unknown,
                        key
                    ) as State[Extract<keyof State, string>];
                }
            }
        }
        return initializedStore;
    };
}
