import type { ChangeEvent, MouseEvent, ReactNode } from 'react';

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
  onSearch?: (searchTerm: string) => void;
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
  results: string[];
}

export interface ResultsProps extends CardListProps {
  isLoading: boolean;
  error: string | null;
}

export interface AppState extends ResultsProps {
  searchTerm: string;
}
