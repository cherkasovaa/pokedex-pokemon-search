import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from '@/types/interfaces';
import { Component, type ErrorInfo } from 'react';

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-800 text-gray-100">
          <div className="text-center p-8 bg-neutral-600 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-2">
              Something went wrong
            </h1>
            <p className="text-lg text-gray-300">
              I&apos;ve logged the error to the console.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
