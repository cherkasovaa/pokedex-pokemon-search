import type { ButtonProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';

export const Button = ({
  content,
  type = 'button',
  onClick,
  className = '',
}: ButtonProps) => {
  const defaultClasses =
    'inline-block max-w-max px-6 py-2 border  rounded-full cursor-pointer uppercase text-sm font-semibold transition-colors';

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(defaultClasses, className)}
    >
      {content}
    </button>
  );
};
