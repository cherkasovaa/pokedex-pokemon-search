import { Container, Footer, Header } from '@/components';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />

      <main role="main" className="flex w-full">
        <Container className="size-full">
          <Outlet />
        </Container>
      </main>

      <Footer />
    </div>
  );
};
