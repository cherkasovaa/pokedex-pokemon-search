import type { ChangeEvent, MouseEvent, ReactNode } from 'react';

type ButtonType = 'submit' | 'button';

interface WithChildren {
  children: ReactNode;
}

interface WithValue {
  value: string;
}
export interface ContainerProps extends WithChildren {
  className?: string;
}

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

export interface ButtonProps {
  content: ReactNode;
  type?: ButtonType;
  onClick?: (event: MouseEvent) => void;
}
