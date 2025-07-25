import { Results, SearchBar } from '@/components';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { pokemonAPI } from '@/services/PokemonAPI';
import type { Pokemon, PokemonDetails } from '@/types/interfaces';
import { useEffect, useRef, useState, type FormEvent } from 'react';

export const App = () => {
  const [query, setQuery] = useLocalStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Pokemon[] | PokemonDetails[]>([]);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    handleSearch(query);
    return () => {
      controller.current?.abort();
    };
  }, []);

  const handleSearch = async (term: string): Promise<void> => {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();
    const signal = controller.current.signal;

    setIsLoading(true);
    setQuery(term);

    try {
      const results = await pokemonAPI.searchPokemons(term, signal);

      if (!signal.aborted) {
        setResults(results);
        setError(null);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      if (!signal.aborted) {
        setIsLoading(false);
        setError(error instanceof Error ? error.message : 'Oops');
        setResults([]);
      }
    }
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(query.trim().toLowerCase());
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={handleSearchSubmit}
      />
      <Results isLoading={isLoading} error={error} results={results} />
    </div>
  );
};
