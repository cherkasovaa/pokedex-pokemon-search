import {
  BASE_SEARCH_TERM,
  baseSimplePokemon,
  EMPTY_VALUE,
  SAVED_TERM,
} from '@/__ tests __/utils/mock-constants';
import {
  ButtonMock,
  ResultsMock,
  SearchBarMock,
} from '@/__ tests __/utils/mock-data';
import { App } from '@/components';
import { pokemonAPI } from '@/services/PokemonAPI';
import { storage } from '@/services/Storage';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/services/Storage');
vi.mock('@/services/PokemonAPI');
vi.mock('@/components/SearchBar/SearchBar', () => ({
  SearchBar: SearchBarMock,
}));
vi.mock('@/components/Results/Results', () => ({ Results: ResultsMock }));
vi.mock('@/components/Button/Button', () => ({ Button: ButtonMock }));

describe('App component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renders tests', () => {
    test('renders main UI parts', () => {
      render(<App />);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('results')).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    const user = userEvent.setup();

    test('handles search from user input, displays results, and saves to storage', async () => {
      vi.mocked(storage.getSearchTerm).mockReturnValue(null);
      vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue([
        baseSimplePokemon,
      ]);

      render(<App />);

      await user.type(screen.getByTestId('search-input'), BASE_SEARCH_TERM);

      expect(pokemonAPI.searchPokemons).toHaveBeenLastCalledWith(
        BASE_SEARCH_TERM,
        expect.any(AbortSignal)
      );

      expect(storage.setSearchTerm).toHaveBeenCalledWith(BASE_SEARCH_TERM);
    });

    test('calls storage.getSearchTerm and searchPokemons on mount', () => {
      render(<App />);

      vi.mocked(storage.getSearchTerm).mockReturnValue(null);
      vi.mocked(pokemonAPI.searchPokemons).mockRejectedValue(EMPTY_VALUE);
    });

    test('handles search term from localStorage on initial load', () => {
      vi.mocked(storage.getSearchTerm).mockReturnValue(SAVED_TERM);
      vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue([
        baseSimplePokemon,
      ]);

      render(<App />);

      expect(pokemonAPI.searchPokemons).toHaveBeenCalledWith(
        SAVED_TERM,
        expect.any(AbortSignal)
      );
    });

    test('aborts previous request on new search', async () => {
      const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

      render(<App />);

      const input = screen.getByTestId('search-input');
      await user.type(input, BASE_SEARCH_TERM);
      await user.type(input, 'pikachu');

      expect(abortSpy).toHaveBeenCalled();
    });

    test('calls storage.setSearchTerm and searchPokemons on update', async () => {
      render(<App />);

      await user.type(screen.getByTestId('search-input'), SAVED_TERM);

      expect(storage.setSearchTerm).toHaveBeenCalledWith(SAVED_TERM);
    });

    test('shows loading state during API call', async () => {
      vi.mocked(pokemonAPI.searchPokemons).mockImplementation(
        () => new Promise((resolve) => resolve)
      );

      render(<App />);

      await user.click(screen.getByTestId('search-input'));

      expect(screen.getByTestId('results')).toHaveTextContent('Loading');
    });

    test('shows error message if no any results', async () => {
      vi.mocked(storage.getSearchTerm).mockReturnValue(null);
      vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue([]);

      render(<App />);

      await user.type(screen.getByTestId('search-input'), 'bad-search');

      expect(screen.getByTestId('results')).toHaveTextContent('');
    });

    test('should do nothing and not show an error if the request is aborted', async () => {
      const abortError = new Error('Aborted');
      abortError.name = 'AbortError';

      vi.mocked(storage.getSearchTerm).mockReturnValue(null);
      vi.mocked(pokemonAPI.searchPokemons).mockRejectedValue(abortError);

      render(<App />);

      await user.type(screen.getByTestId('search-input'), BASE_SEARCH_TERM);

      expect(screen.getByTestId('results')).not.toHaveTextContent('Aborted');
      expect(screen.getByTestId('results')).not.toHaveTextContent('Error');
      expect(storage.removeSearchTerm).not.toHaveBeenCalled();
    });
  });
});
