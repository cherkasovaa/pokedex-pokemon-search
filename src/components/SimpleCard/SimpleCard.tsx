import type { SimpleCardProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const SimpleCard = ({ pokemon }: SimpleCardProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { name, url } = pokemon;
  const id = url.split('/').filter(Boolean).pop();

  if (!id) {
    throw new Error(`ID "${id}" not found`);
  }

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsChecked((prev) => !prev);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    navigate({
      pathname: `/details/${id}`,
      search: searchParams.toString(),
    });
  };

  return (
    <div
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer min-w-60"
      onClick={handleCardClick}
    >
      <div
        className={`h-full p-4 rounded-lg hover:bg-primary transition-colors shadow-md flex items-start justify-between 
          ${isChecked ? 'bg-primary' : 'bg-card'}`}
      >
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-lg capitalize mb-1">{name}</h3>
          <p className="text-sm text-foreground-muted">Pokemon #{id}</p>
        </div>

        <div className="flex flex-col items-end gap-1">
          <input
            type="checkbox"
            checked={isChecked}
            className={cn(
              'mr-2.5 mt-2.5 accent-accent cursor-pointer',
              isChecked ? 'opacity-100' : 'opacity-0'
            )}
            readOnly
          />

          <button
            className="px-3 py-1 text-sm text-accent hover:bg-accent/10 rounded-2xl duration-300 cursor-pointer"
            onClick={handleClick}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
