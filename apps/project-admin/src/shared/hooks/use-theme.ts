'use client';

import { useEffect } from 'react';

import { useTheme } from '@workspace/ui/lib';

import { useThemeStore } from '../store';

// ----------------------------------------------------------------------
// ! 수정 필요

export const useChangeTheme = () => {
  const { setTheme, theme } = useTheme();

  const { setIsDark, isDark } = useThemeStore();

  const handleThemeChange = (isChecked: boolean) => {
    setIsDark(isChecked ? 'dark' : 'light');
    setTheme(isChecked ? 'dark' : 'light');

    // setTimeout(() => {
    // }, 200);
  };

  useEffect(() => {
    useThemeStore.persist.rehydrate();

    setTheme(isDark === 'dark' ? 'dark' : 'light');
  }, []);

  return [isDark === 'dark', handleThemeChange] as const;
};
