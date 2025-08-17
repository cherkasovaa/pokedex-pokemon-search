'use client';

import { Container, ThemeSwitcher } from '@/components';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { APP_ROUTES } from '@/router/routes';
import { useLocale, useTranslations } from 'next-intl';

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const t = useTranslations('Navigation');

  const toggleLanguage = () => {
    router.push(pathname, { locale: locale === 'en' ? 'ru' : 'en' });
  };

  return (
    <header
      role="banner"
      className="text-center py-4 border-b-1 border-b-foreground-muted/30"
    >
      <Container className="flex items-center justify-end gap-4 py-0">
        <nav className="mr-auto">
          {APP_ROUTES.map((route) => {
            if (route.meta.isShowInNavigation) {
              const isActive = pathname === route.path;

              return (
                <Link
                  key={route.name}
                  href={route.path}
                  className={`duration-300 mx-1.5 
                  ${isActive ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                  aria-label={`Link to the ${route.name} page`}
                >
                  {t(route.name).toUpperCase()}
                </Link>
              );
            }
          })}
        </nav>

        <div
          className="bg-foreground/10 rounded-full px-6 py-1 cursor-pointer"
          onClick={toggleLanguage}
        >
          <button className="text-accent text-sm transition-colors">
            {locale.toUpperCase()}
          </button>
        </div>
        <ThemeSwitcher />
      </Container>
    </header>
  );
};
