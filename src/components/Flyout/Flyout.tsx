import { useSelectedStore } from '@/store/store';

export const Flyout = () => {
  const count = useSelectedStore((state) => state.selectedItems.length);
  const unselectAllItems = useSelectedStore((state) => state.unselectAllItems);

  const defaultButtonClasses =
    'px-3 py-1 text-sm text-accent bg-accent/5 hover:bg-accent/10 rounded-2xl duration-300 cursor-pointer';

  return count > 0 ? (
    <div
      className={`flex gap-3 justify-end items-center ${count ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-sm text-foreground-muted">
        {count} items are selected
      </div>
      <button className={defaultButtonClasses} onClick={unselectAllItems}>
        Unselect all
      </button>
      <button className={defaultButtonClasses}>Download</button>
    </div>
  ) : (
    <div className="h-7"></div>
  );
};
