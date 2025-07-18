import { ErrorMessage } from '@/components/ErrorMessage';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('ErrorMessage component', () => {
  describe('Rendering Tests', () => {
    test('renders item correctly without props', () => {
      const defaultMessage = "I've logged the error to the console.";

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
