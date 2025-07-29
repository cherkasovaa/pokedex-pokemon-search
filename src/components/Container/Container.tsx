import type { ContainerProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';

export const Container = ({ children, className = '' }: ContainerProps) => {
  const defaultClasses = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';

  return <div className={cn(defaultClasses, className)}>{children}</div>;
};
