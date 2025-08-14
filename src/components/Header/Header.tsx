'use client';

import { Container, ThemeSwitcher } from '@/components';
import { Link } from '@/i18n/navigation';
import { APP_ROUTES } from '@/router/routes';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  return (
    <header
      role="banner"
      className="text-center py-4 border-b-1 border-b-foreground-muted/30"
    >
      <Container className="flex justify-between py-0">
        <nav>
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

        <ThemeSwitcher />
      </Container>
    </header>
  );
};
