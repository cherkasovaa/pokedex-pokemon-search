import { DetailsPanel, Layout } from '@/components';
import { AboutPage, HomePage, NotFoundPage } from '@/pages';
import { APP_PATHS } from '@/types/router/constants';
import { Route, Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={APP_PATHS.HOME} element={<HomePage />}>
          <Route path={APP_PATHS.DETAIL} element={<DetailsPanel />} />
        </Route>
        <Route path={APP_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={APP_PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
