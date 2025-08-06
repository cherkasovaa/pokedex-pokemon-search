import { Pagination, Results, SearchBar } from '@/components';
import { ITEMS_PER_PAGE } from '@/config/constants';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { APP_PATHS } from '@/types/router/constants';
import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const PokemonList = () => {
  const [query, setQuery] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(query);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading, error } = usePokemonSearch(searchTerm, currentPage);

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

  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto]">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearchSubmit}
      />

      <Results
        results={data?.results || []}
        isLoading={isLoading}
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
