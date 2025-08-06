import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from '@/context/theme/ThemeProvider';
import { AppRouter } from '@/router/AppRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';

const queryClient = new QueryClient();

let root = document.getElementById('root');

if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
