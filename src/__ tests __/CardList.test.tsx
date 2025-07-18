import {
  baseDetailedPokemon,
  isDetailedPokemonMock,
  mockSimplePokemonList,
} from '@/__ tests __/utils/mock-constants';
import {
  DetailedCardMock,
  SimpleCardMock,
} from '@/__ tests __/utils/mock-data';
import { CardList } from '@/components/CardList';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/components/DetailedCard', () => ({
  DetailedCard: DetailedCardMock,
}));

vi.mock('@/components/SimpleCard', () => ({
  SimpleCard: SimpleCardMock,
}));

vi.mock('@/types/typeGuards', () => ({
  isDetailedPokemon: isDetailedPokemonMock,
}));

describe('CardList component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    test('renders correct number of items when data is provided', () => {
      render(<CardList results={mockSimplePokemonList} />);

      const elements = screen.getAllByTestId('simple-card');

      expect(elements).toHaveLength(mockSimplePokemonList.length);
    });

    test('renders SimpleCard for each item when results are of type Pokemon', () => {
      render(<CardList results={mockSimplePokemonList} />);

      const elements = screen.getAllByTestId('simple-card');

      expect(elements.length).toEqual(mockSimplePokemonList.length);
      expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
    });

    test('renders DetailedCard for each item when results are of type PokemonDetails', () => {
      render(<CardList results={[baseDetailedPokemon]} />);

      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
      expect(screen.queryByTestId('simple-card')).not.toBeInTheDocument();
    });

    test('renders nothing if results is empty', () => {
      render(<CardList results={[]} />);

      expect(screen.queryByTestId('simple-card')).not.toBeInTheDocument();
      expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
    });
  });
});
