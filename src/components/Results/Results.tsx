'use client';

import { CardList, ErrorMessage, Flyout, Loader } from '@/components/';
import type { ResultsProps } from '@/types/interfaces';
import { useTranslations } from 'next-intl';

export const Results = ({ results, isLoading, error }: ResultsProps) => {
  const t = useTranslations('Results');

  return (
    <div className="h-full p-4 flex flex-col overflow-hidden">
      <div className="flex-grow">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error.message} />}

        {!isLoading && !error && results?.length === 0 && (
          <p className="text-2xl text-foreground-muted text-center">
            {t('noDataMsg')}
          </p>
        )}

        {!isLoading && !error && results?.length && (
          <>
            <CardList results={results} />
            <Flyout />
          </>
        )}
      </div>
    </div>
  );
};
