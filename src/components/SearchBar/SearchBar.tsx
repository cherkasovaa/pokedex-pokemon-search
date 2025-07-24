import { Button, SearchInputField } from '@/components';
import { storage } from '@/services/Storage';
import type { SearchBarProps } from '@/types/interfaces';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const savedSearchTerm = storage.getSearchTerm();

    if (savedSearchTerm) {
      setValue(savedSearchTerm);

      if (onSearch) {
        onSearch(savedSearchTerm);
      }
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const searchTerm = value.toLowerCase().trim();

    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form
      className="py-2 grid grid-cols-1 place-items-end sm:grid-cols-[1fr_auto] gap-6"
      onSubmit={handleSubmit}
    >
      <SearchInputField onChange={handleChange} value={value} />
      <Button
        content="Search"
        type="submit"
        className="border-gray-300 hover:bg-gray-200 text-gray-300 hover:text-gray-800"
      />
    </form>
  );
};
