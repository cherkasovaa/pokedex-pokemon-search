import { ErrorMessage, Pagination, Results, SearchBar } from '@/components';
import { useApi } from '@/hooks/useApi';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { pokemonAPI } from '@/services/PokemonAPI';
import { APP_PATHS } from '@/types/router/constants';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const ITEMS_PER_PAGE = 16;
const PAGE_LIMIT = 5;

export const App = () => {
  const [query, setQuery] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(query);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPage = Number(searchParams.get('page')) || 1;

  const memoizedApiCall = useCallback(() => {
    return pokemonAPI.searchPokemons(searchTerm, currentPage, ITEMS_PER_PAGE);
  }, [searchTerm, currentPage]);

  const { isLoading, error, data } = useApi(memoizedApiCall);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.totalCount / ITEMS_PER_PAGE));
    } else {
      setTotalPages(0);
    }
  }, [data]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = query.trim().toLowerCase();

    navigate({
      pathname: APP_PATHS.HOME,
    });

    setSearchTerm(searchTerm);
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

      {data?.results ? (
        <Results isLoading={isLoading} error={error} results={data.results} />
      ) : (
        <ErrorMessage message="There is no data to display. Try again" />
      )}

      {totalPages > 1 && !isLoading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageLimit={PAGE_LIMIT}
        />
      )}
    </div>
  );
};
