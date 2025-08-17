'use client';

import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@/context/theme/ThemeProvider';
import type { Theme } from '@/types/theme.types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Providers({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider defaultTheme={initialTheme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
