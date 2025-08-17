'use client';

import { Button } from '@/components/Button/Button';
import { DetailedCard } from '@/components/DetailedCard/DetailedCard';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { useRouter } from '@/i18n/navigation';
import type { PokemonDetails } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export const DetailsPanel = ({ pokemon }: { pokemon: PokemonDetails }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('DetailsPanel');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('details');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-4 h-full flex flex-col gap-5">
      <Button
        content={t('closeButton')}
        className="self-end"
        onClick={handleClose}
      />

      {pokemon ? (
        <DetailedCard pokemon={pokemon} className="lg:my-auto" />
      ) : (
        <ErrorMessage message={t('notFound')} />
      )}
    </div>
  );
};
