import { create } from 'zustand';

type ItemId = string;

interface SelectionState {
  selectedItems: ItemId[];
  toggleItemSelection: (id: ItemId) => void;
  unselectAllItems: () => void;
}

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
