'use client';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import dynamic from 'next/dynamic';
import { BrowserRouter } from 'react-router';

const AppRouter = dynamic(
  () => import('@/router/AppRouter').then((m) => m.AppRouter),
  { ssr: false }
);

export default function ClientApp() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
