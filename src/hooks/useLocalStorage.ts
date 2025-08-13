import { useEffect, useState } from 'react';

export const useLocalStorage = (key = 'searchTerm') => {
  const [query, setQueryState] = useState('');

  useEffect(() => {
    const term = localStorage.getItem(key);

    if (term) {
      setQueryState(term);
    }
  }, [key]);

  const setQuery = (value: string): void => {
    setQueryState(value);
    localStorage.setItem(key, value);
  };

  return [query, setQuery] as const;
};
