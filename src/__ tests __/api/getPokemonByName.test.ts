import {
  BASE_SEARCH_TERM,
  baseDetailedPokemon,
  mockPokemonAPIResponse,
} from '@/__ tests __/utils/mock-constants';
import { getPokemonByName } from '@/api/getPokemonByName';
import { isPokemonData } from '@/types/typeGuards';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/types/typeGuards', () => ({
  isPokemonData: vi.fn(),
}));

describe('getPokemonByName', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('fetches with correct URL and returns result', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockPokemonAPIResponse),
    } as Response);
    vi.mocked(isPokemonData).mockReturnValue(true);

    const result = await getPokemonByName(BASE_SEARCH_TERM);

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

    await expect(getPokemonByName('test')).rejects.toThrow(
      'Pokemon "test" not found.'
    );
  });

  test('throws error for other HTTP errors', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    await expect(getPokemonByName(BASE_SEARCH_TERM)).rejects.toThrow(
      'HTTP error! status: 500'
    );
  });

  test('throws error if data is invalid', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ some: 'invalid data' }),
    } as Response);

    await expect(getPokemonByName(BASE_SEARCH_TERM)).rejects.toThrow(
      'Invalid pokemon data received from API'
    );
  });
});
