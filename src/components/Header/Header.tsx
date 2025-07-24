import { APP_ROUTES } from '@/router/routes';
import { Link } from 'react-router';

export const Header = () => {
  return (
    <header className="text-center bg-neutral-800 text-gray-100 py-4 border-b-1 border-b-gray-500/30">
      <nav>
        {APP_ROUTES.map((route) => {
          if (route.meta.isShowInNavigation) {
            return (
              <Link
                key={route.name}
                to={route.path}
                className="text-gray-100 hover:text-red-800 duration-300 mx-1.5"
                aria-label={`Link to the ${route.name} page`}
              >
                {route.name.toUpperCase()}
              </Link>
            );
          }
        })}
      </nav>
    </header>
  );
};
