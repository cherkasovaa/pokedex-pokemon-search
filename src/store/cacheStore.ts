import { getPokemonByName } from '@/api/getPokemonByName';
import type { CacheState } from '@/types/store/interfaces';
import type { ItemId } from '@/types/store/types';
import { create } from 'zustand';

export const useCacheStore = create<CacheState>((set, get) => ({
  cache: {},
  fetchDetails: async (id: ItemId) => {
    if (get().cache[id]) return;

    const [details] = await getPokemonByName(id);

    set((state) => ({
      cache: { ...state.cache, [id]: details },
    }));
  },
}));
