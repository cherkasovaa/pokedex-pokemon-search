import { baseSimplePokemon } from '@/__ tests __/utils/mock-constants';
import { SimpleCard } from '@/components/SimpleCard';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('SimpleCard component', () => {
  describe('Rendering Tests', () => {
    test('renders item name and description correctly', () => {
      render(<SimpleCard pokemon={baseSimplePokemon} />);

      const header = screen.getByRole('heading', { level: 3 });
      expect(header).toHaveTextContent(baseSimplePokemon.name);

      const description = screen.getByText('Pokemon #1');
      expect(description).toBeInTheDocument();
    });
  });
});
