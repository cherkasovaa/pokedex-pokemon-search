'use client';

import { THEME_COOKIES_KEY } from '@/context/theme/constants';
import { ThemeContext } from '@/context/theme/themeContext';
import {
  THEME_MODE,
  type Theme,
  type ThemeProviderProps,
} from '@/types/theme.types';
import { useEffect, useState } from 'react';

export const ThemeProvider = ({
  children,
  defaultTheme = THEME_MODE.SYSTEM,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(THEME_MODE.LIGHT, THEME_MODE.DARK);

    document.cookie = `${THEME_COOKIES_KEY}=${theme};path=/;max-age=31536000`;

    if (theme === THEME_MODE.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? THEME_MODE.DARK
        : THEME_MODE.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
