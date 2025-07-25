import { Pagination, Results, SearchBar } from '@/components';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { pokemonAPI } from '@/services/PokemonAPI';
import type { Pokemon, PokemonDetails } from '@/types/interfaces';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';

const ITEMS_PER_PAGE = 16;
const PAGE_LIMIT = 5;

export const App = () => {
  const [query, setQuery] = useLocalStorage();
  const [searchTerm, setSearchTerm] = useState(query);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Pokemon[] | PokemonDetails[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const controller = useRef<AbortController | null>(null);

  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();
    const signal = controller.current.signal;

    setIsLoading(true);

    pokemonAPI
      .searchPokemons(searchTerm, currentPage, ITEMS_PER_PAGE, signal)
      .then(({ results, totalCount }) => {
        if (!signal.aborted) {
          setResults(results);
          setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
          setError(null);
        }
      })
      .catch((error) => {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }

        if (!signal.aborted) {
          setError(error instanceof Error ? error.message : 'Oops');
          setResults([]);
        }
      })
      .finally(() => setIsLoading(false));
  }, [searchTerm, currentPage]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = query.trim().toLowerCase();

    setSearchParams({ page: '1' });
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
      <Results isLoading={isLoading} error={error} results={results} />

      {totalPages > 1 && (
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
