import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { App } from '@components/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

let root = document.getElementById('root');

if (!root) {
  root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
