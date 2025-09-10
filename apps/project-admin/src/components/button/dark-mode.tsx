'use client';

import { BasicThemeSwitch, ThemeSwitch } from '@workspace/ui/components/button';
import { useTheme } from '@workspace/ui/lib';
import { useState } from 'react';

export const ThemeButton = () => {
  const { setTheme, theme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === 'dark');

  const handleThemeChange = (e: boolean /*  React.ChangeEvent<HTMLInputElement> */) => {
    const newChecked = e;
    setIsChecked(newChecked);

    // 🌙 Add slight delay before switching theme to allow animation
    setTimeout(() => {
      setTheme(newChecked ? 'dark' : 'light');
    }, 200); // Match the duration of your animation (ms)
  };

  return <BasicThemeSwitch onChange={handleThemeChange} checked={isChecked} />;
  // <ThemeSwitch onChange={handleThemeChange} checked={isChecked} />;
};
