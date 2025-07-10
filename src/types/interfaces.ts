import type { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}
