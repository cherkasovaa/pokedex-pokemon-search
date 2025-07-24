import type { SimpleCardProps } from '@/types/interfaces';

export const SimpleCard = ({ pokemon }: SimpleCardProps) => {
  const { name, url } = pokemon;
  const id = url.split('/').filter(Boolean).pop();

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="h-full p-4 text-gray-200 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
        <h3 className="font-semibold text-lg capitalize">{name}</h3>
        <p className="text-sm text-gray-400">Pokemon #{id}</p>
      </div>
    </div>
  );
};
