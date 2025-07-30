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

  const commonClasses = 'rounded-md font-medium transition-colors';
  const defaultArrowButtonClasses =
    'px-2 py-1 text-lg bg-card not-disabled:hover:bg-primary disabled:opacity-50 not-disabled:cursor-pointer mx-1 shadow-sm';

  return (
    <div className="flex gap-2 items-baseline justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(commonClasses, defaultArrowButtonClasses)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        ⇦
      </button>
      {getPaginationGroup().map((item) => (
        <button
          key={item}
          onClick={() => onPageChange(item)}
          className={cn(
            commonClasses,
            `shadow-sm px-4 py-2 text-sm ${
              currentPage === item
                ? 'bg-accent text-gray-100 cursor-default'
                : 'bg-card hover:bg-primary cursor-pointer'
            }`
          )}
          disabled={currentPage === item}
          aria-label={`Page №${item}`}
        >
          {item}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(commonClasses, defaultArrowButtonClasses)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        ⇨
      </button>
    </div>
  );
};
