import type { PaginationProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageLimit,
}: PaginationProps) => {
  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return Array.from(
      { length: Math.min(pageLimit, totalPages - start) },
      (_, i) => start + i + 1
    );
  };

  const commonClasses =
    'rounded-md font-medium transition-colors text-gray-100';
  const defaultArrowButtonClasses =
    'px-2 py-1 text-lg bg-neutral-700 not-disabled:hover:bg-neutral-600 disabled:opacity-50 not-disabled:cursor-pointer mx-1';

  return (
    <div className="flex gap-2 items-baseline justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(commonClasses, defaultArrowButtonClasses)}
        disabled={currentPage <= 1}
      >
        ⇦
      </button>
      {getPaginationGroup().map((item) => (
        <button
          key={item}
          onClick={() => onPageChange(item)}
          className={cn(
            commonClasses,
            `px-4 py-2 text-sm ${
              currentPage === item
                ? 'bg-red-700 text-white cursor-default'
                : 'bg-neutral-700 hover:bg-neutral-600 cursor-pointer'
            }`
          )}
          disabled={currentPage === item}
        >
          {item}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(commonClasses, defaultArrowButtonClasses)}
        disabled={currentPage >= totalPages}
      >
        ⇨
      </button>
    </div>
  );
};
