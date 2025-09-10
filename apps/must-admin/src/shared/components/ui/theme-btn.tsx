'use client';

import { useChangeTheme } from '@/shared/hooks';
import { BasicThemeSwitch } from '@workspace/ui/components/button';

export const ThemeButton = () => {
  const [isDark, handleThemeChange] = useChangeTheme();

  return <BasicThemeSwitch onChange={handleThemeChange} checked={isDark} />;
};
