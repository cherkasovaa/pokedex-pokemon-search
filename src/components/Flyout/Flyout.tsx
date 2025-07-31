import { useCacheStore } from '@/store/cacheStore';
import { useSelectedStore } from '@/store/store';
import { cn } from '@/utils/cn';
import { exportToCsv } from '@/utils/exportToCsv';
import { useState } from 'react';

export const Flyout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedItems = useSelectedStore((state) => state.selectedItems);
  const unselectAllItems = useSelectedStore((state) => state.unselectAllItems);
  const details = useCacheStore((state) => state.cache);
  const fetchDetails = useCacheStore((state) => state.fetchDetails);

  const count = selectedItems.length;

  const handleDownload = async () => {
    if (count < 0) return;

    try {
      setIsLoading(true);

      const idsToFetch = selectedItems.filter((item) => !details[item]);

      if (idsToFetch.length > 0) {
        await Promise.all(idsToFetch.map((id) => fetchDetails(id)));
      }

      const itemsToDownload = selectedItems
        .map((item) => details[item])
        .filter(Boolean);

      if (itemsToDownload) {
        exportToCsv(itemsToDownload);
      }
    } catch (error) {
      throw new Error(
        'Failed to download pokemon data: ' +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const defaultButtonClasses =
    'px-3 py-1 text-sm text-accent bg-accent/5 hover:bg-accent/10 rounded-2xl duration-300 cursor-pointer';

  return count > 0 ? (
    <div
      className={`flex gap-3 justify-end items-center ${count ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="text-sm text-foreground-muted">
        {`${count} item${count > 1 ? 's are' : ' is'} selected`}
      </div>
      <button className={defaultButtonClasses} onClick={unselectAllItems}>
        Unselect all
      </button>
      <button
        className={cn(defaultButtonClasses, isLoading ? 'animate-pulse' : '')}
        disabled={isLoading}
        onClick={handleDownload}
      >
        {isLoading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  ) : (
    <div className="h-7"></div>
  );
};
