'use client';

import { Button } from '@/components/Button/Button';
import { DetailedCard } from '@/components/DetailedCard/DetailedCard';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { Loader } from '@/components/Loader/Loader';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { isDetailedPokemon } from '@/types/typeGuards';
import { useRouter, useSearchParams } from 'next/navigation';

export const DetailsPanel = ({ id }: { id: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading, error } = usePokemonSearch(id);

  const pokemon =
    data?.results && isDetailedPokemon(data?.results[0])
      ? data?.results[0]
      : null;

  const handleClose = () => {
    const queries = searchParams.toString();
    router.push(queries ? `/?${queries}` : '/');
  };

  return (
    <div className="p-4 h-full flex flex-col gap-5">
      <Button content="Close" className="self-end" onClick={handleClose} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error.message} />}

      {!isLoading && !error && !pokemon && (
        <ErrorMessage message={`Pokemon with ID "${id}" not found.`} />
      )}

      {!isLoading && !error && pokemon && (
        <DetailedCard pokemon={pokemon} className="lg:my-auto" />
      )}
    </div>
  );
};
