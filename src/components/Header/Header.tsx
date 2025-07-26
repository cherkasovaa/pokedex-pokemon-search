import { APP_ROUTES } from '@/router/routes';
import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header className="text-center py-4 border-b-1 border-b-gray-500/30">
      <nav>
        {APP_ROUTES.map((route) => {
          if (route.meta.isShowInNavigation) {
            return (
              <NavLink
                key={route.name}
                to={route.path}
                className={({ isActive }) => `duration-300 mx-1.5 
                ${isActive ? 'text-red-800' : 'text-gray-100 hover:text-red-800'}`}
                aria-label={`Link to the ${route.name} page`}
              >
                {route.name.toUpperCase()}
              </NavLink>
            );
          }
        })}
      </nav>
    </header>
  );
};
