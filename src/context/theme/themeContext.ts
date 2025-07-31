import { THEME_MODE, type ThemeContextState } from '@/types/theme.types';
import { createContext } from 'react';

const initialThemeState = {
  theme: THEME_MODE.SYSTEM,
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextState>(initialThemeState);
