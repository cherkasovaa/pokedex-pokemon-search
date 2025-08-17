'use client';

import { useSelectedStore } from '@/store/store';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export const Flyout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations('Flyout');

  const selectedItems = useSelectedStore((state) => state.selectedItems);
  const unselectAllItems = useSelectedStore((state) => state.unselectAllItems);

  const count = selectedItems.length;

  const handleDownload = async () => {
    if (count === 0 || isLoading) return;

    setIsLoading(true);

    try {
      const idsQueryParam = selectedItems.join(',');
      window.open(`/api/export?ids=${idsQueryParam}`, '_blank');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new Error(t('downloadError') + msg);
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
        {t('itemsSelected', { count: count })}
      </div>
      <button className={defaultButtonClasses} onClick={unselectAllItems}>
        {t('unselectAllButton')}
      </button>
      <button
        className={cn(defaultButtonClasses, isLoading ? 'animate-pulse' : '')}
        disabled={isLoading}
        onClick={handleDownload}
      >
        {t('downloadButton', { state: isLoading ? 'loading' : 'other' })}
      </button>
    </div>
  ) : (
    <div className="h-7"></div>
  );
};
