'use client';
import type { DetailedCardProps } from '@/types/interfaces';
import { cn } from '@/utils/cn';
import { formatString } from '@/utils/formatString';
import Image from 'next/image';
import { useState } from 'react';

export const DetailedCard = ({
  pokemon,
  className = '',
}: DetailedCardProps) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  if (!pokemon) return;

  const { name, sprites, stats } = pokemon;

  return (
    <div className={cn('w-full p-2', className)}>
      <div className="max-h-min p-4 text-foreground rounded-lg bg-primary transition-colors">
        <div className="relative flex justify-center mb-2">
          {loaded && (
            <div className="absolute size-24 rounded-lg animate-pulse bg-foreground/10"></div>
          )}
          <Image
            src={sprites.front_default}
            alt={name}
            loading="lazy"
            width={96}
            height={96}
            className={cn(
              'size-24 object-contain duration-300 ease-in-out',
              loaded ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={() => setLoaded(false)}
          />
        </div>
        <h3 className="font-semibold text-lg text-center mb-3 capitalize">
          {name}
        </h3>
        <div className="space-y-1 text-sm">
          {stats.map((stat) => (
            <div key={stat.name} className="flex justify-between">
              <span className="text-foreground-muted">
                {formatString(stat.name)}:
              </span>
              <span className="font-medium">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
