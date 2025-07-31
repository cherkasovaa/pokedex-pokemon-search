import type { SelectionState } from '@/types/store/interfaces';
import type { ItemId } from '@/types/store/types';
import { create } from 'zustand';

export const useSelectedStore = create<SelectionState>((set) => ({
  selectedItems: [],
  toggleItemSelection: (id: ItemId) =>
    set((state) => {
      if (state.selectedItems.includes(id)) {
        return {
          selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
        };
      }

      return { selectedItems: [...state.selectedItems, id] };
    }),
  unselectAllItems: () => set({ selectedItems: [] }),
}));
