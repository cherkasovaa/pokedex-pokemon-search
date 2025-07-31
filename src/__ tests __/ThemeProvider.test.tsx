import { ThemeProvider } from '@/context/theme/ThemeProvider';
import { useTheme } from '@/hooks/useTheme';
import { THEME_MODE, type Theme } from '@/types/theme.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, describe, expect, test, vi } from 'vitest';

let themeLSValue = '';
const setThemeLS = vi.fn();

vi.mock('@/hooks/useLocalStorage', () => ({
  useLocalStorage: () => [themeLSValue, setThemeLS],
}));

const TestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span data-testId="result">Current {theme}</span>
      <button
        data-testId="light-mode"
        onClick={() => setTheme(THEME_MODE.LIGHT)}
      >
        Light
      </button>
      <button data-testId="dark-mode" onClick={() => setTheme(THEME_MODE.DARK)}>
        Dark
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches: false,
  }));

  const renderThemeProvider = (defaultTheme?: Theme | undefined) => {
    render(
      <ThemeProvider defaultTheme={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );
  };

  afterAll(() => {
    vi.clearAllMocks();
  });

  test('renders children', () => {
    renderThemeProvider();

    expect(screen.getByTestId('result')).toBeInTheDocument();
  });

  test('applies light theme if system preference is light', () => {
    renderThemeProvider();

    expect(document.documentElement).toHaveClass(THEME_MODE.LIGHT);
    expect(document.documentElement).not.toHaveClass(THEME_MODE.DARK);
  });

  test('applies dark theme if system preference is dark', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });

    renderThemeProvider();

    expect(document.documentElement).toHaveClass(THEME_MODE.DARK);
    expect(document.documentElement).not.toHaveClass(THEME_MODE.LIGHT);
  });

  test('use defaultTheme prop', () => {
    renderThemeProvider(THEME_MODE.DARK);

    expect(document.documentElement).toHaveClass(THEME_MODE.DARK);
    expect(document.documentElement).not.toHaveClass(THEME_MODE.LIGHT);

    renderThemeProvider(THEME_MODE.LIGHT);

    expect(document.documentElement).toHaveClass(THEME_MODE.LIGHT);
    expect(document.documentElement).not.toHaveClass(THEME_MODE.DARK);
  });

  test('initializes with the theme from localStorage if it exists and updates it', async () => {
    themeLSValue = THEME_MODE.DARK;
    setThemeLS.mockClear();

    renderThemeProvider();

    expect(screen.getByTestId('result')).toHaveTextContent(/current dark/i);

    await userEvent.click(screen.getByTestId('light-mode'));

    expect(screen.getByTestId('result')).toHaveTextContent(/current light/i);
  });
});
