import type { PokemonDetails } from '@/types/interfaces';
import type { ItemId } from '@/types/store/types';

export interface SelectionState {
  selectedItems: ItemId[];
  toggleItemSelection: (id: ItemId) => void;
  unselectAllItems: () => void;
}

export interface CacheState {
  cache: Record<string, PokemonDetails>;
  fetchDetails: (id: ItemId) => Promise<void>;
}
