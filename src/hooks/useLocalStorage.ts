import { useState } from 'react';

export const useLocalStorage = (key = 'searchTerm') => {
  const [query, setQueryState] = useState(
    () => localStorage.getItem(key) || ''
  );

  const setQuery = (value: string): void => {
    setQueryState(value);
    localStorage.setItem(key, value);
  };

  return [query, setQuery] as const;
};
