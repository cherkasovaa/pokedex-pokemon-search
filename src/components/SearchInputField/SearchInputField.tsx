import type { SearchInputFieldProps } from '@/types/interfaces';
import { useTranslations } from 'next-intl';

export const SearchInputField = ({
  value,
  onChange,
}: SearchInputFieldProps) => {
  const t = useTranslations('SearchBar');
  return (
    <input
      type="text"
      name="search"
      placeholder={t('inputPlaceholder')}
      aria-label="Search input field"
      value={value}
      onChange={onChange}
      className="border border-foreground-muted rounded-full px-5 py-2 outline-none transition-all duration-300 ease-in-out w-full sm:w-64 focus:w-full"
      autoComplete="false"
    />
  );
};
