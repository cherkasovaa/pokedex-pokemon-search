import { Pagination, Results, SearchBar } from '@/components';
import { ApiProvider } from '@/context/apiContext';
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

  const apiState = useApi(memoizedApiCall);

  useEffect(() => {
    setTotalPages(
      apiState.data ? Math.ceil(apiState.data.totalCount / ITEMS_PER_PAGE) : 0
    );
  }, [apiState.data]);

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
    <ApiProvider value={apiState}>
      <div className="h-full grid grid-rows-[auto_1fr_auto]">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearchSubmit}
        />

        <Results />

        {totalPages > 1 && !apiState.isLoading && !apiState.error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageLimit={PAGE_LIMIT}
          />
        )}
      </div>
    </ApiProvider>
  );
};
