'use client';

import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { createSelectors, persistMiddleware } from './utils';

// ----------------------------------------------------------------------
// ! open

interface OpenStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const useOpenStoreBase = create<OpenStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

// ----------------------------------------------------------------------
// ! theme

interface ThemeStore {
  isDark: 'light' | 'dark';
  setIsDark: (theme: 'light' | 'dark') => void;
}

const useThemeStoreBase = create<ThemeStore>()(
  persist(
    // combine(
    //   {
    //     isDark: (localStorage.getItem('theme') as unknown as 'light' | 'dark') ?? 'light',
    //   },
    (set, get) => ({
      setIsDark: (theme) => set({ isDark: theme }),
      isDark: (get() as unknown as 'light' | 'dark') ?? 'light',
    }),
    // ),
    { name: 'isDark' },
  ),
);

// ----------------------------------------------------------------------
// ! loading

interface LoadingStore {
  isLoading: boolean;
  actions: {
    setIsLoading: (isLoading: boolean) => void;
    startLoading: () => void;
    stopLoading: () => void;
  };
}

const useLoadingStoreBase = create<LoadingStore>((set) => ({
  isLoading: false,
  actions: {
    setIsLoading: (isLoading) => set({ isLoading }),
    startLoading: () => set({ isLoading: true }),
    stopLoading: () => set({ isLoading: false }),
  },
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// ! export

export const useOpenStore = createSelectors(useOpenStoreBase);
export const useThemeStore = createSelectors(useThemeStoreBase);
export const useLoadingStore = createSelectors(useLoadingStoreBase);
