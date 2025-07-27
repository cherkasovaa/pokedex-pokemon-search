import { getPokemonByName } from '@/api/getPokemonByName';
import { Button } from '@/components/Button/Button';
import { DetailedCard } from '@/components/DetailedCard/DetailedCard';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/components/Loader/Loader';
import { useApi } from '@/hooks/useApi';
import { useCallback } from 'react';
import { useOutletContext } from 'react-router';

export const DetailsPanel = () => {
  const { pokemonId, handleClose } = useOutletContext<{
    pokemonId: string;
    handleClose: () => void;
  }>();

  const memoizedApiCall = useCallback(() => {
    return getPokemonByName(pokemonId);
  }, [pokemonId]);

  const { isLoading, error, data } = useApi(memoizedApiCall);

  const pokemon = data?.[0];

  return (
    <div className="h-full flex flex-col gap-5">
      <Button
        content="Close"
        className="hover:bg-gray-200 text-gray-300 hover:text-gray-800 self-end"
        onClick={handleClose}
      />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <DetailedCard pokemon={pokemon} className="lg:my-auto" />
      )}

      {!isLoading && !error && !pokemon && (
        <ErrorMessage message={`Pokemon with ID "${pokemonId}" not found.`} />
      )}
    </div>
  );
};
