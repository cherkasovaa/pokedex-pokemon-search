import { useEffect, useState } from 'react';

interface UseApiState<T> {
  isLoading: boolean;
  error: string | null;
  data: T | null;
}

export const useApi = <T>(apiCall: () => Promise<T>): UseApiState<T> => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    apiCall()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      })
      .finally(() => setIsLoading(false));
  }, [apiCall]);

  return { isLoading, error, data };
};
