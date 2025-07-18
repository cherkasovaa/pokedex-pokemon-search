import { Container } from '@/components/Container';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Container Component', () => {
  describe('Rendering Tests', () => {
    test('renders children', () => {
      const childNode = <span data-testid="child">Child</span>;

      render(<Container>{childNode}</Container>);

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    test('applies custom className', () => {
      const customClass = 'border border-red-100';

      const childNode = <span data-testid="child">Child</span>;
      render(<Container className={customClass}>{childNode}</Container>);

      const element = screen.getByTestId('child').parentElement;

      expect(element).toHaveClass(customClass);
    });
  });
});
