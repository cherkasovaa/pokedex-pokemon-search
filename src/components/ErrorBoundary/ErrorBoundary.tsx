import { ErrorMessage } from '@/components';
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
        <div className="min-h-screen flex items-center justify-center bg-neutral-800">
          <ErrorMessage message={this.state.error?.message} />
        </div>
      );
    }
    return this.props.children;
  }
}
