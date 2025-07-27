import { searchPokemon } from '@/api/searchPokemon';
import { PokemonList } from '@/components';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/api/searchPokemon');

describe('PokemonList component', () => {
  const user = userEvent.setup();

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  test('should perform a new search on submit', async () => {
    vi.mocked(searchPokemon).mockResolvedValue({
      results: [],
      totalCount: 0,
    });

    renderComponent();

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await user.clear(input);
    await user.type(input, 'ditto');
    await user.click(button);

    await waitFor(() => {
      expect(searchPokemon).toHaveBeenCalledWith('ditto', 1, 16);
    });
  });
});
