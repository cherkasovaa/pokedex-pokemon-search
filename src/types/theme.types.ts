import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export const THEME_MODE = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export type Theme = (typeof THEME_MODE)[keyof typeof THEME_MODE];

export interface ThemeOption {
  value: Theme;
  icon: LucideIcon;
}

export interface ThemeContextState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}
