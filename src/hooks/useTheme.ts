import { ThemeContext } from '@/context/theme/themeContext';
import { useContext } from 'react';

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within its matching ThemeContext');
  }

  return context;
};
