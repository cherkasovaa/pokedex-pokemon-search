import { baseDetailedPokemon } from '@/__ tests __/utils/mock-constants';
import { getPokemonByName } from '@/api/getPokemonByName';
import { useSelectedPokemons } from '@/hooks/useSelectedPokemons';
import type { PokemonDetails } from '@/types/interfaces';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/api/getPokemonByName');
const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useSelectedPokemons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns a list of pokemons for one selected item', async () => {
    const selectedItems: string[] = ['1'];

    vi.mocked(getPokemonByName).mockResolvedValue([baseDetailedPokemon]);

    const { result } = renderHook(() => useSelectedPokemons(selectedItems), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data.length).toBeGreaterThan(0));

    expect(result.current.data).toEqual([baseDetailedPokemon]);
    expect(result.current.data.length).toEqual(1);
  });

  test('returns a list of pokemons for multiple selected items', async () => {
    const selectedItems: string[] = ['1', '2'];
    const mockPokemonsData: PokemonDetails[] = [
      baseDetailedPokemon,
      { ...baseDetailedPokemon, id: 2, name: 'pikachu' },
    ];

    vi.mocked(getPokemonByName).mockImplementation((id) => {
      if (id === '1') return Promise.resolve([mockPokemonsData[0]]);
      if (id === '2') return Promise.resolve([mockPokemonsData[1]]);
      return Promise.resolve([]);
    });

    const { result } = renderHook(() => useSelectedPokemons(selectedItems), {
      wrapper,
    });

    await waitFor(() =>
      expect(result.current.data.length).toEqual(mockPokemonsData.length)
    );

    expect(result.current.data).toEqual(mockPokemonsData);
    expect(result.current.data).toHaveLength(mockPokemonsData.length);
  });

  test('returns an empty array if no items are selected', async () => {
    const selectedItems: string[] = [];

    const { result } = renderHook(() => useSelectedPokemons(selectedItems), {
      wrapper,
    });

    await waitFor(() => expect(result.current.data).toHaveLength(0));

    expect(result.current.data).toEqual([]);
    expect(getPokemonByName).not.toHaveBeenCalled();
  });
});
