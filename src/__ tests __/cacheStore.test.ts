import { baseDetailedPokemon } from '@/__ tests __/utils/mock-constants';
import { getPokemonByName } from '@/api/getPokemonByName';
import { useCacheStore } from '@/store/cacheStore';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/api/getPokemonByName', () => ({
  getPokemonByName: vi.fn(),
}));

describe('useCacheStore', () => {
  beforeEach(() => {
    useCacheStore.setState({ cache: {} });
    vi.clearAllMocks();
  });

  test('store is an empty object as initial state', () => {
    expect(useCacheStore.getState().cache).toEqual({});
  });

  test('calls getPokemonByName and update cache if item is not cached', async () => {
    vi.mocked(getPokemonByName).mockResolvedValue([baseDetailedPokemon]);

    const { fetchDetails } = useCacheStore.getState();

    await fetchDetails('1');

    const state = useCacheStore.getState();

    expect(getPokemonByName).toHaveBeenCalledTimes(1);
    expect(getPokemonByName).toHaveBeenCalledWith('1');

    expect(state.cache['1']).toBeDefined();
    expect(state.cache['1']).toEqual(baseDetailedPokemon);
  });

  test('not call getPokemonByName if item is already cached', async () => {
    useCacheStore.setState({ cache: { '1': baseDetailedPokemon } });

    const { fetchDetails } = useCacheStore.getState();

    await fetchDetails('1');

    expect(getPokemonByName).not.toHaveBeenCalled();
  });
});
