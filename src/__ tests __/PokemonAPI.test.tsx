import {
  BASE_SEARCH_TERM,
  baseDetailedPokemon,
  EMPTY_VALUE,
  mockPokemonAPIResponse,
  mockSimplePokemonList,
} from '@/__ tests __/utils/mock-constants';
import PokemonAPI, { pokemonAPI } from '@/services/PokemonAPI';
import { isPokemonData } from '@/types/typeGuards';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/types/typeGuards', () => ({
  isPokemonData: vi.fn(),
}));

describe('PokemonAPI', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('the PokemonAPI is a singleton', () => {
    const api1 = PokemonAPI.getInstance();

    expect(api1).toBe(pokemonAPI);
  });

  describe('searchPokemons', () => {
    test('returns all pokemons if searchTerm is empty', async () => {
      const spy = vi
        .spyOn(pokemonAPI, 'getAllPokemons')
        .mockResolvedValue(mockSimplePokemonList);

      const result = await pokemonAPI.searchPokemons(EMPTY_VALUE);
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(mockSimplePokemonList);
    });

    test('returns one pokemon if searchTerm is provided', async () => {
      const spy = vi
        .spyOn(pokemonAPI, 'getPokemonByName')
        .mockResolvedValue([baseDetailedPokemon]);

      const result = await pokemonAPI.searchPokemons(BASE_SEARCH_TERM);
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual([baseDetailedPokemon]);
    });

    test('returns empty array on AbortError', async () => {
      vi.spyOn(pokemonAPI, 'getPokemonByName').mockRejectedValue(
        Object.assign(new Error('Aborted'), { name: 'AbortError' })
      );

      const result = await pokemonAPI.searchPokemons(BASE_SEARCH_TERM);

      expect(result).toEqual([]);
    });

    test('throws on errors', async () => {
      vi.spyOn(pokemonAPI, 'getPokemonByName').mockRejectedValue(
        new Error('Error message')
      );

      await expect(pokemonAPI.searchPokemons(BASE_SEARCH_TERM)).rejects.toThrow(
        'Error message'
      );
    });
  });

  describe('getAllPokemons', () => {
    test('fetches with correct URL and returns results', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ results: mockSimplePokemonList }),
      } as Response);
      const result = await pokemonAPI.getAllPokemons();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon?limit=20'),
        expect.any(Object)
      );
      expect(result).toEqual(mockSimplePokemonList);
    });

    test('throws error if response not ok', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(pokemonAPI.getAllPokemons()).rejects.toThrow(
        'HTTP error! status: 500'
      );
    });
  });

  describe('getPokemonByName', () => {
    test('fetches with correct URL and returns result', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockPokemonAPIResponse),
      } as Response);
      vi.mocked(isPokemonData).mockReturnValue(true);

      const result = await pokemonAPI.getPokemonByName(BASE_SEARCH_TERM);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon/ditto'),
        expect.any(Object)
      );
      expect(result[0]).toEqual(baseDetailedPokemon);
    });

    test('throws error if response status equals 404', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(pokemonAPI.getPokemonByName('test')).rejects.toThrow(
        'Pokemon "test" not found.'
      );
    });

    test('throws error for other HTTP errors', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(
        pokemonAPI.getPokemonByName(BASE_SEARCH_TERM)
      ).rejects.toThrow('HTTP error! status: 500');
    });

    test('throws error if data is invalid', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ some: 'invalid data' }),
      } as Response);

      await expect(
        pokemonAPI.getPokemonByName(BASE_SEARCH_TERM)
      ).rejects.toThrow('Invalid pokemon data received from API');
    });
  });
});
