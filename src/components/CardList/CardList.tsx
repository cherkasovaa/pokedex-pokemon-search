import { DetailedCard, SimpleCard } from '@/components';
import type { CardListProps } from '@/types/interfaces';
import { isDetailedPokemon } from '@/types/typeGuards';

export const CardList = ({ results }: CardListProps) => {
  return (
    <div className="flex flex-wrap justify-center p-4 overflow-auto">
      {results.map((pokemon) =>
        isDetailedPokemon(pokemon) ? (
          <DetailedCard
            key={pokemon.id}
            pokemon={pokemon}
            className="sm:w-1/2 md:w-1/3 lg:w-1/4"
          />
        ) : (
          <SimpleCard key={pokemon.name} pokemon={pokemon} />
        )
      )}
    </div>
  );
};
