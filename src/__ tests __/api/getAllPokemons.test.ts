import { mockSimplePokemonList } from '@/__ tests __/utils/mock-constants';
import { getAllPokemons } from '@/api/getAllPokemons';
import { describe, expect, test, vi } from 'vitest';

describe('getAllPokemons', () => {
  test('fetches with correct URL and returns results', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ results: mockSimplePokemonList, count: 10 }),
    } as Response);
    const result = await getAllPokemons(1, 15);

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

    await expect(getAllPokemons(1, 15)).rejects.toThrow(
      'HTTP error! status: 500'
    );
  });
});
