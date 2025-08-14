'use client';

import { PokemonList } from '@/components';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export const HomePage = ({ children }: PropsWithChildren) => {
  const segment = useSelectedLayoutSegment();
  const showDetails = segment === 'details';

  return (
    <div className="relative flex">
      <section className="flex-1 px-4">
        <PokemonList />
      </section>
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300" />
      )}
      <aside
        className={`lg:p-4 fixed right-0 top-0 bottom-0 z-50 transition-all duration-300 ease-in-out overflow-hidden
          ${showDetails ? 'translate-x-0 lg:max-w-sm' : 'translate-x-[200%] lg:max-w-0'} w-full max-w-sm lg:static lg:w-md lg:z-auto lg:translate-x-0`}
      >
        <div
          className="h-full bg-card shadow-md overflow-hidden lg:rounded-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </aside>
    </div>
  );
};
