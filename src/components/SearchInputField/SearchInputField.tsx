import type { SearchInputFieldProps } from '@/types/interfaces';

export const SearchInputField = ({
  value,
  onChange,
}: SearchInputFieldProps) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Input something to search..."
      aria-label="Search input field"
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-full px-5 py-2 outline-none transition-all duration-300 ease-in-out w-full sm:w-64 focus:w-full"
      autoComplete="false"
    />
  );
};
