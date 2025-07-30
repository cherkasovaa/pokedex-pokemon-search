import { THEMES } from '@/components/ThemeSwitcher/themes';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/utils/cn';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-foreground/10 flex items-center gap-3.5 rounded-full px-3 py-2">
      {THEMES.map(({ value, icon: Icon }) => {
        return (
          <button
            key={value}
            type="button"
            role="switch"
            aria-label={value}
            title={`Switch to ${value} theme`}
            className={cn(
              'hover:text-accent/50 cursor-pointer text-sm transition-colors',
              theme === value ? 'text-accent' : 'text-foreground'
            )}
            onClick={() => setTheme(value)}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
};
