import { Layout } from '@/components';
import { AboutPage, HomePage, NotFoundPage } from '@/pages';
import { APP_PATHS } from '@/types/router/constants';
import { Route, Routes } from 'react-router';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={APP_PATHS.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={APP_PATHS.ABOUT} element={<AboutPage />} />
        <Route path={APP_PATHS.NOT_FOUND} element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
