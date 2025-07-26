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
        .mockResolvedValue({ results: mockSimplePokemonList, totalCount: 2 });

      const result = await pokemonAPI.searchPokemons(EMPTY_VALUE, 1, 15);
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual({ results: mockSimplePokemonList, totalCount: 2 });
    });

    test('returns one pokemon if searchTerm is provided', async () => {
      const spy = vi
        .spyOn(pokemonAPI, 'getPokemonByName')
        .mockResolvedValue([baseDetailedPokemon]);

      const result = await pokemonAPI.searchPokemons(BASE_SEARCH_TERM, 1, 15);
      expect(spy).toHaveBeenCalled();
      expect(result).toEqual({ results: [baseDetailedPokemon], totalCount: 1 });
    });

    test('throws on errors', async () => {
      vi.spyOn(pokemonAPI, 'getPokemonByName').mockRejectedValue(
        new Error('Error message')
      );

      await expect(
        pokemonAPI.searchPokemons(BASE_SEARCH_TERM, 1, 15)
      ).rejects.toThrow('Error message');
    });
  });

  describe('getAllPokemons', () => {
    test('fetches with correct URL and returns results', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({ results: mockSimplePokemonList, count: 10 }),
      } as Response);
      const result = await pokemonAPI.getAllPokemons(1, 15);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon?limit=15&offset=0')
      );
      expect(result).toEqual({
        results: mockSimplePokemonList,
        totalCount: 10,
      });
    });

    test('throws error if response not ok', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(pokemonAPI.getAllPokemons(1, 15)).rejects.toThrow(
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
        expect.stringContaining('/pokemon/ditto')
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
