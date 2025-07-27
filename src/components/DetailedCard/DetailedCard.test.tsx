import { baseDetailedPokemon } from '@/__ tests __/utils/mock-constants';
import { DetailedCard } from '@/components';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('DetailedCard component', () => {
  describe('Data Display Tests', () => {
    test('renders pokemon name in heading', () => {
      render(<DetailedCard pokemon={baseDetailedPokemon} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent(baseDetailedPokemon.name);
    });

    test('renders all stats with formatted names and values', () => {
      render(<DetailedCard pokemon={baseDetailedPokemon} />);

      expect(screen.getByText('Hp:')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('Attack:')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    test('renders image with alt', () => {
      render(<DetailedCard pokemon={baseDetailedPokemon} />);

      const img = screen.getByRole('img');

      expect(img).toHaveAttribute(
        'src',
        baseDetailedPokemon.sprites.front_default
      );
      expect(img).toHaveAttribute('alt', baseDetailedPokemon.name);
    });

    test('renders nothing if stats is empty', () => {
      render(<DetailedCard pokemon={{ ...baseDetailedPokemon, stats: [] }} />);

      expect(screen.queryByText(/\d/g)).not.toBeInTheDocument();
    });
  });
});
