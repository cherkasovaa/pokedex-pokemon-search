import { Button } from '@/components/Button/Button';
import { DetailedCard } from '@/components/DetailedCard/DetailedCard';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/components/Loader/Loader';
import { pokemonAPI } from '@/services/PokemonAPI';
import type { PokemonDetails } from '@/types/interfaces';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

export const DetailsPanel = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<PokemonDetails[]>([]);

  const { pokemonId, handleClose } = useOutletContext<{
    pokemonId: string;
    handleClose: () => void;
  }>();

  useEffect(() => {
    if (pokemonId) {
      setIsLoading(true);

      pokemonAPI
        .getPokemonByName(pokemonId)
        .then((results) => {
          setResults(results);
          setError(null);
        })
        .catch((error) => {
          setError(error instanceof Error ? error.message : 'Oops');
          setResults([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [pokemonId]);

  return (
    pokemonId && (
      <div className="h-full flex flex-col gap-5">
        <Button
          content="Close"
          className="hover:bg-gray-200 text-gray-300 hover:text-gray-800 self-end"
          onClick={handleClose}
        />
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && (
          <DetailedCard pokemon={results[0]} className="lg:my-auto" />
        )}
      </div>
    )
  );
};
