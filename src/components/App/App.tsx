import { Results, SearchBar } from '@/components';
import { pokemonAPI } from '@/services/PokemonAPI';
import { storage } from '@/services/Storage';
import type { Pokemon, PokemonDetails } from '@/types/interfaces';
import { useEffect, useRef, useState } from 'react';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(storage.getSearchTerm() || '');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Pokemon[] | PokemonDetails[]>([]);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    handleSearch(searchQuery);
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
    setSearchQuery(term);
    storage.setSearchTerm(term);
    console.log('Term to search is ', term);

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

  return (
    <div className="h-full grid grid-rows-[auto_1fr]">
      <SearchBar onSearch={handleSearch} />
      <Results isLoading={isLoading} error={error} results={results} />
    </div>
  );
};
