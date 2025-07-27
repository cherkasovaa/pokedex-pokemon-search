import { ResultsMock } from '@/__ tests __/utils/mock-data';
import { App } from '@/components';
import { pokemonAPI } from '@/services/PokemonAPI';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/services/PokemonAPI');
vi.mock('@/components/Results/Results', () => ({ Results: ResultsMock }));

describe('App component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Renders tests', () => {
    test('renders main UI parts', () => {
      // const message = 'There is no data to display. Try again';

      vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue({
        results: [],
        totalCount: 0,
      });

      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      expect(screen.getByRole('textbox')).toBeInTheDocument();
      // expect(screen.getByText(message)).toBeInTheDocument();
    });
  });

  // describe('Integration Tests', () => {
  //   const user = userEvent.setup();

  //   test('handles search from user input, displays results, and saves to storage', async () => {
  //     vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue({
  //       results: [baseSimplePokemon],
  //       totalCount: 1,
  //     });

  //     render(<App />);

  //     await user.type(screen.getByRole('textbox'), BASE_SEARCH_TERM);
  //     await user.click(screen.getByRole('button'));

  //     expect(pokemonAPI.searchPokemons).toHaveBeenLastCalledWith(
  //       BASE_SEARCH_TERM,
  //       expect.any(AbortSignal)
  //     );

  //     expect(localStorage.getItem(SEARCH_KEY)).toBe(BASE_SEARCH_TERM);
  //   });

  //   test('handles search term from localStorage on initial load', () => {
  //     localStorage.setItem(SEARCH_KEY, BASE_SEARCH_TERM);

  //     vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue([
  //       baseSimplePokemon,
  //     ]);

  //     render(<App />);

  //     expect(screen.getByRole('textbox')).toHaveValue(BASE_SEARCH_TERM);
  //     expect(pokemonAPI.searchPokemons).toHaveBeenCalledWith(
  //       BASE_SEARCH_TERM,
  //       expect.any(AbortSignal)
  //     );
  //   });

  //   test('aborts previous request on new search', async () => {
  //     const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

  //     render(<App />);

  //     const input = screen.getByRole('textbox');
  //     const button = screen.getByRole('button');

  //     await user.type(input, 'pika');
  //     await user.click(button);
  //     await user.type(input, 'pikachu');
  //     await user.click(button);

  //     expect(abortSpy).toHaveBeenCalled();
  //   });

  //   test('shows loading state during API call', async () => {
  //     vi.mocked(pokemonAPI.searchPokemons).mockImplementation(
  //       () => new Promise((resolve) => resolve)
  //     );

  //     render(<App />);

  //     await user.click(screen.getByRole('button'));

  //     expect(screen.getByTestId('results')).toHaveTextContent('Loading');
  //   });

  //   test('shows error message if no any results', async () => {
  //     vi.mocked(pokemonAPI.searchPokemons).mockResolvedValue([]);

  //     render(<App />);

  //     await user.type(screen.getByRole('textbox'), 'bad-search');
  //     await user.click(screen.getByRole('button'));

  //     expect(screen.getByTestId('results')).toHaveTextContent('');
  //   });

  //   test('should do nothing and not show an error if the request is aborted', async () => {
  //     const abortError = new Error('Aborted');
  //     abortError.name = 'AbortError';

  //     vi.mocked(pokemonAPI.searchPokemons).mockRejectedValue(abortError);

  //     render(<App />);

  //     await user.type(screen.getByRole('textbox'), BASE_SEARCH_TERM);

  //     expect(screen.getByTestId('results')).not.toHaveTextContent('Aborted');
  //     expect(screen.getByTestId('results')).not.toHaveTextContent('Error');
  //   });
  // });
});
