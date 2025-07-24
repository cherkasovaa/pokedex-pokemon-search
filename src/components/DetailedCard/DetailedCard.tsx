import type { DetailedCardProps } from '@/types/interfaces';
import { formatString } from '@/utils/formatString';

export const DetailedCard = ({ pokemon }: DetailedCardProps) => {
  const { name, sprites, stats } = pokemon;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <div className="max-h-min p-4 text-gray-200 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors">
        <div className="flex justify-center mb-2">
          <img
            src={sprites.front_default}
            alt={name}
            className="w-24 h-24 object-contain"
          />
        </div>
        <h3 className="font-semibold text-lg text-center mb-3 capitalize">
          {name}
        </h3>
        <div className="space-y-1 text-sm">
          {stats.map((stat) => (
            <div key={stat.name} className="flex justify-between">
              <span className="text-gray-400">{formatString(stat.name)}:</span>
              <span className="font-medium">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
