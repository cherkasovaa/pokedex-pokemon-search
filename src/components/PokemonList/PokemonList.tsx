'use client';

import { Button, Pagination, Results, SearchBar } from '@/components';
import { ITEMS_PER_PAGE } from '@/config/constants';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { useRouter } from '@/i18n/navigation';
import type { PokemonListProps } from '@/types/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, type FormEvent } from 'react';

export const PokemonList = ({
  query,
  currentPage,
  initialData,
}: PokemonListProps) => {
  const queryClient = useQueryClient();
  const t = useTranslations('PokemonList');

  const searchParams = useSearchParams();
  const router = useRouter();

  const qFromUrl = (searchParams.get('q') ?? query).toLowerCase() || '';
  const pageFromUrl = Number(searchParams.get('page') ?? currentPage) || 1;

  const [input, setInput] = useState(qFromUrl);
  useEffect(() => setInput(qFromUrl), [qFromUrl]);

  const { data, isLoading, error, isRefetching } = usePokemonSearch(
    qFromUrl,
    pageFromUrl,
    initialData
  );

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['pokemons', qFromUrl, pageFromUrl],
    });
  };

  const totalPages = useMemo(() => {
    return data?.totalCount ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;
  }, [data]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const term = input.trim().toLowerCase();

    const params = new URLSearchParams();

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    params.delete('page');
    params.delete('details');

    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="flex gap-3.5 py-2">
        <SearchBar
          value={input}
          onChange={setInput}
          onSearch={handleSearchSubmit}
        />

        <Button content={t('refreshButton')} onClick={handleRefresh} />
      </div>

      <Results
        results={data?.results || []}
        isLoading={isLoading || isRefetching}
        error={error}
      />

      {totalPages > 1 && !isLoading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
