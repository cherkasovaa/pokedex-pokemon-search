import { Container, ThemeSwitcher } from '@/components';
import { APP_ROUTES } from '@/router/routes';
import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header
      role="banner"
      className="text-center py-4 border-b-1 border-b-foreground-muted/30"
    >
      <Container className="flex justify-between py-0">
        <nav>
          {APP_ROUTES.map((route) => {
            if (route.meta.isShowInNavigation) {
              return (
                <NavLink
                  key={route.name}
                  to={route.path}
                  className={({ isActive }) => `duration-300 mx-1.5 
                  ${isActive ? 'text-accent' : 'text-foreground hover:text-accent'}`}
                  aria-label={`Link to the ${route.name} page`}
                >
                  {route.name.toUpperCase()}
                </NavLink>
              );
            }
          })}
        </nav>

        <ThemeSwitcher />
      </Container>
    </header>
  );
};
