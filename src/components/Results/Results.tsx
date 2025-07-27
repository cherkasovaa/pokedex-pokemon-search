import { CardList, ErrorMessage, Loader } from '@/components/';
import { useApiContext } from '@/context/apiContext';

export const Results = () => {
  const { isLoading, error, data } = useApiContext();

  const results = data?.results;

  return (
    <div className="h-full p-4 flex flex-col overflow-hidden">
      <div className="flex-grow">
        {isLoading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && results?.length ? (
          <CardList results={results} />
        ) : (
          <p className="text-2xl text-gray-300 text-center">
            There is no data to display. Try again
          </p>
        )}
      </div>
    </div>
  );
};
