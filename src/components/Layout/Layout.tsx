import { Footer, Header } from '@/components';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
