import { CardList, ErrorMessage, Loader } from '@/components/';
import type { ResultsProps } from '@/types/interfaces';

export const Results = ({ isLoading, error, results }: ResultsProps) => {
  return (
    <div className="h-full p-4 flex flex-col overflow-y-auto">
      <div className="flex-grow">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && <CardList results={results} />}
      </div>
    </div>
  );
};
