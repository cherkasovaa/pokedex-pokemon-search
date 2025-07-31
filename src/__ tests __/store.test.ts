import { useSelectedStore } from '@/store/store';
import { beforeEach, describe, expect, test } from 'vitest';

describe('useSelectedStore', () => {
  beforeEach(() => {
    useSelectedStore.setState({ selectedItems: [] });
  });

  test('have an empty array as initial state', () => {
    const state = useSelectedStore.getState();

    expect(state.selectedItems.length).toBe(0);
  });

  test('add item to the store', () => {
    const item = '1';

    useSelectedStore.getState().toggleItemSelection(item);

    expect(useSelectedStore.getState().selectedItems).toEqual([item]);
  });

  test('remove item from the store if item exist', () => {
    const item = '1';
    useSelectedStore.setState({ selectedItems: [item] });

    useSelectedStore.getState().toggleItemSelection(item);

    expect(useSelectedStore.getState().selectedItems).toEqual([]);
  });

  test('unselect all items', () => {
    useSelectedStore.setState({ selectedItems: ['1', '2', '3'] });

    useSelectedStore.getState().unselectAllItems();

    expect(useSelectedStore.getState().selectedItems).toEqual([]);
  });
});
