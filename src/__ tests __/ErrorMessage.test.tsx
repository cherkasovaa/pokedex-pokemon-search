import { ErrorMessage } from '@/components';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('ErrorMessage component', () => {
  describe('Rendering Tests', () => {
    test('renders item correctly without props', () => {
      const defaultMessage =
        'An unexpected error occurred. Please try again later';

      render(<ErrorMessage />);

      expect(screen.getByText(defaultMessage)).toBeInTheDocument();
    });

    test('renders item correctly with props', () => {
      const message = 'The pokemon did not found';

      render(<ErrorMessage message={message} />);

      expect(screen.getByText(message)).toBeInTheDocument();
    });
  });
});
