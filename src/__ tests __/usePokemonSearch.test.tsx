import {
  BASE_SEARCH_TERM,
  baseDetailedPokemon,
  EMPTY_VALUE,
  mockSimplePokemonList,
} from '@/__ tests __/utils/mock-constants';
import { searchPokemon } from '@/api/searchPokemon';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/api/searchPokemon');
const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePokemonSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('returns a list of pokemons for a search term and page', async () => {
    const searchTerm = EMPTY_VALUE;
    const currentPage = 1;

    vi.mocked(searchPokemon).mockResolvedValue({
      results: mockSimplePokemonList,
      totalCount: mockSimplePokemonList.length,
    });

    const { result } = renderHook(
      () => usePokemonSearch(searchTerm, currentPage),
      {
        wrapper,
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.results).toEqual(mockSimplePokemonList);
    expect(result.current.data?.results.length).toEqual(
      mockSimplePokemonList.length
    );
  });

  test('returns a single pokemon if the search term is a direct match', async () => {
    const searchTerm = BASE_SEARCH_TERM;

    vi.mocked(searchPokemon).mockResolvedValue({
      results: [baseDetailedPokemon],
      totalCount: 1,
    });

    const { result } = renderHook(() => usePokemonSearch(searchTerm), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.results).toEqual([baseDetailedPokemon]);
    expect(result.current.data?.results.length).toEqual(1);
  });
});
