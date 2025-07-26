import type { SimpleCardProps } from '@/types/interfaces';
import { useNavigate, useSearchParams } from 'react-router';

export const SimpleCard = ({ pokemon }: SimpleCardProps) => {
  const { name, url } = pokemon;
  const id = url.split('/').filter(Boolean).pop();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    navigate({
      pathname: `/${id}`,
      search: searchParams.toString(),
    });
  };

  return (
    id && (
      <div
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="h-full p-4 text-gray-200 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
          <h3 className="font-semibold text-lg capitalize">{name}</h3>
          <p className="text-sm text-gray-400">Pokemon #{id}</p>
        </div>
      </div>
    )
  );
};
