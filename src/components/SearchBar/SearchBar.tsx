import { Button, SearchInputField } from '@/components';
import type { SearchBarProps } from '@/types/interfaces';
import { type ChangeEvent } from 'react';

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <form
      className="py-2 grid grid-cols-1 place-items-end sm:grid-cols-[1fr_auto] gap-6"
      onSubmit={onSearch}
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
