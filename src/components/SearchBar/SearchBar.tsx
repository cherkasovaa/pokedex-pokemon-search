import { Button, SearchInputField } from '@/components';
import type { SearchBarProps } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import { type ChangeEvent } from 'react';

export const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  const t = useTranslations('SearchBar');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <form
      className="flex-grow grid grid-cols-1 place-items-end sm:grid-cols-[1fr_auto] gap-6"
      onSubmit={onSearch}
    >
      <SearchInputField onChange={handleChange} value={value} />
      <Button content={t('searchButton')} type="submit" />
    </form>
  );
};
