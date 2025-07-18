import { ErrorMessageMock } from '@/__ tests __/utils/mock-data';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/components/ErrorMessage', () => ({
  ErrorMessage: ErrorMessageMock,
}));

const ThrowingComponent = () => {
  throw new Error('Test error message');
};

describe('ErrorBoundary component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Error Catching Tests', () => {
    test('renders children correctly when there is no error', () => {
      const child = <div data-testid="child">I am rendered successfully</div>;

      render(<ErrorBoundary>{child}</ErrorBoundary>);

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
    });

    test('catch the error and display a fallback UI', () => {
      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Test error message'
      );
    });

    test('logs error to console', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ThrowingComponent />
        </ErrorBoundary>
      );

      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining('Error caught by ErrorBoundary:'),
        expect.any(Error),
        expect.any(Object)
      );

      spy.mockRestore();
    });
  });
});
