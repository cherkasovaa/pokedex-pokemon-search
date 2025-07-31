import { THEME_MODE, type ThemeOption } from '@/types/theme.types';
import { Monitor, Moon, Sun } from 'lucide-react';

export const THEMES: ThemeOption[] = [
  { value: THEME_MODE.SYSTEM, icon: Monitor },
  { value: THEME_MODE.LIGHT, icon: Sun },
  { value: THEME_MODE.DARK, icon: Moon },
];
