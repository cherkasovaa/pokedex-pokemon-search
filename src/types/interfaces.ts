import type { ChangeEvent, FormEvent, MouseEvent, ReactNode } from 'react';

type ButtonType = 'submit' | 'button';

interface WithChildren {
  children: ReactNode;
}

interface WithValue {
  value: string;
}

interface WithClasses {
  className?: string;
}

export interface ContainerProps extends WithChildren, WithClasses {}

export type ErrorBoundaryProps = WithChildren;

export interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

export type SearchInputState = WithValue;

export interface SearchBarProps {
  value: string;
  onChange: (_term: string) => void;
  onSearch: (event: FormEvent<HTMLFormElement>) => void;
}

export interface SearchInputFieldProps extends WithValue {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps extends WithClasses {
  content: ReactNode;
  type?: ButtonType;
  onClick?: (event: MouseEvent) => void;
}

export interface ErrorMessageProps {
  message?: string;
}

export interface CardListProps {
  results: Pokemon[] | PokemonDetails[];
}

export interface ResultsProps extends CardListProps {
  isLoading: boolean;
  error: string | null;
}

export interface AppState extends ResultsProps {
  searchTerm: string;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface RawStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    name: string;
  }[];
}

export interface PokemonListResponse {
  results: Pokemon[];
  count: number;
}

export interface SimpleCardProps {
  pokemon: Pokemon;
}

export interface DetailedCardProps {
  pokemon: PokemonDetails | undefined;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageLimit: number;
}
