'use client';

import { useSelectedPokemons } from '@/hooks/useSelectedPokemons';
import { useSelectedStore } from '@/store/store';
import { cn } from '@/utils/cn';
import { exportToCsv } from '@/utils/exportToCsv';
import { useState } from 'react';

export const Flyout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectedItems = useSelectedStore((state) => state.selectedItems);
  const unselectAllItems = useSelectedStore((state) => state.unselectAllItems);

  const { data: pokemonDetails } = useSelectedPokemons(selectedItems);

  const count = selectedItems.length;

  const handleDownload = async () => {
    if (count === 0 || isLoading || !pokemonDetails) return;

    try {
      setIsLoading(true);

      if (pokemonDetails.length > 0) {
        exportToCsv(pokemonDetails);
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
