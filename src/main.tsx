import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { AppRouter } from '@/router/AppRouter';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';

let root = document.getElementById('root');

if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </BrowserRouter>
  </StrictMode>
);
