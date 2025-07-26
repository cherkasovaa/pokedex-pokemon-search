import type { DetailedCardProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import { formatString } from '@/utils/formatString';

export const DetailedCard = ({
  pokemon,
  className = '',
}: DetailedCardProps) => {
  if (!pokemon) return;

  const { name, sprites, stats } = pokemon;

  return (
    <div className={cn('w-full p-2', className)}>
      <div className="max-h-min p-4 text-gray-200 rounded-lg bg-neutral-600 transition-colors">
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
