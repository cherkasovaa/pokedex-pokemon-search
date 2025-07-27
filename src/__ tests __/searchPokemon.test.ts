import {
  BASE_SEARCH_TERM,
  baseDetailedPokemon,
  EMPTY_VALUE,
  mockSimplePokemonList,
} from '@/__ tests __/utils/mock-constants';
import { getAllPokemons } from '@/api/getAllPokemons';
import { getPokemonByName } from '@/api/getPokemonByName';
import { searchPokemon } from '@/api/searchPokemon';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/api/getAllPokemons');
vi.mock('@/api/getPokemonByName');

describe('searchPokemon', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('returns all pokemons if searchTerm is empty', async () => {
    vi.mocked(getAllPokemons).mockResolvedValue({
      results: mockSimplePokemonList,
      totalCount: 2,
    });

    const result = await searchPokemon(EMPTY_VALUE, 1, 15);

    expect(getAllPokemons).toHaveBeenCalledWith(1, 15);
    expect(getPokemonByName).not.toHaveBeenCalled();
    expect(result).toEqual({ results: mockSimplePokemonList, totalCount: 2 });
  });

  test('returns one pokemon if searchTerm is provided', async () => {
    vi.mocked(getPokemonByName).mockResolvedValue([baseDetailedPokemon]);

    const result = await searchPokemon(BASE_SEARCH_TERM, 1, 15);

    expect(getPokemonByName).toHaveBeenCalledWith(BASE_SEARCH_TERM);
    expect(getAllPokemons).not.toHaveBeenCalled();
    expect(result).toEqual({ results: [baseDetailedPokemon], totalCount: 1 });
  });

  test('throws on errors', async () => {
    vi.mocked(getPokemonByName).mockRejectedValue(new Error('Error message'));

    await expect(searchPokemon(BASE_SEARCH_TERM, 1, 15)).rejects.toThrow(
      'Error message'
    );
  });
});
