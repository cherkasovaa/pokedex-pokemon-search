import { Button } from '@/components/Button/Button';
import { DetailedCard } from '@/components/DetailedCard/DetailedCard';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/components/Loader/Loader';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { isDetailedPokemon } from '@/types/typeGuards';
import { useOutletContext } from 'react-router';

export const DetailsPanel = () => {
  const { pokemonId, handleClose } = useOutletContext<{
    pokemonId: string;
    handleClose: () => void;
  }>();
  const { data, isLoading, error } = usePokemonSearch(pokemonId);

  const pokemon =
    data?.results && isDetailedPokemon(data?.results[0])
      ? data?.results[0]
      : null;

  return (
    <div className="p-4 h-full flex flex-col gap-5">
      <Button content="Close" className="self-end" onClick={handleClose} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {!isLoading && !error && !pokemon && (
        <ErrorMessage message={`Pokemon with ID "${pokemonId}" not found.`} />
      )}

      {!isLoading && !error && pokemon && (
        <DetailedCard pokemon={pokemon} className="lg:my-auto" />
      )}
    </div>
  );
};
