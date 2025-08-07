import { Button, Pagination, Results, SearchBar } from '@/components';
import { ITEMS_PER_PAGE } from '@/config/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { APP_PATHS } from '@/types/router/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const PokemonList = () => {
  const queryClient = useQueryClient();

  const [query, setQuery] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading, error, isRefetching } = usePokemonSearch(
    searchTerm,
    currentPage
  );

  const totalPages = useMemo(() => {
    return data ? Math.ceil(data.totalCount / ITEMS_PER_PAGE) : 0;
  }, [data]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = query.trim().toLowerCase();

    setSearchTerm(searchTerm);

    navigate({
      pathname: APP_PATHS.HOME,
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ['pokemons', searchTerm, currentPage],
    });
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <div className="flex gap-3.5 py-2">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearchSubmit}
        />

        <Button content="Refresh" onClick={handleRefresh} />
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
