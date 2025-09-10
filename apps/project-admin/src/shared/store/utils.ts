import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@repo/utils';
import { StoreApi, UseBoundStore } from 'zustand';
import { StateStorage, createJSONStorage } from 'zustand/middleware';

// ----------------------------------------------------------------------
// ! selector

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export function createSelectors<S extends UseBoundStore<StoreApi<object>>>(_store: S) {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};

  Object.keys(store.getState()).forEach((key) => {
    const selector = (state: object) => state[key as keyof typeof state];
    (store.use as any)[key] = () => store(selector);
  });

  return store;
}

// ----------------------------------------------------------------------
// ! persist

export const persistMiddleware = createJSONStorage(() => ({
  getItem: (key: string) => getLocalStorage(key),
  setItem: (key, value) => setLocalStorage(key, value),
  removeItem: (key) => removeLocalStorage(key),
}));
