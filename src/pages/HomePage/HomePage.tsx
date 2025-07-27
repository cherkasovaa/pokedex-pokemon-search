import { App } from '@/components';
import { APP_PATHS } from '@/types/router/constants';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';

export const HomePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const showDetails = !!params.id;

  const handleCloseDetails = () => {
    navigate({
      pathname: APP_PATHS.HOME,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="relative flex">
      <section className="flex-1 px-4">
        <App />
      </section>
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300" />
      )}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 transition-all duration-300 ease-in-out overflow-hidden
          ${showDetails ? 'translate-x-0 lg:max-w-sm' : 'translate-x-full lg:max-w-0'} w-full max-w-sm lg:static lg:w-md lg:z-auto lg:translate-x-0`}
      >
        <div
          className="h-full p-4 bg-neutral-700 shadow-xl overflow-hidden lg:rounded-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <Outlet
            context={{ pokemonId: params.id, handleClose: handleCloseDetails }}
          />
        </div>
      </aside>
    </div>
  );
};
