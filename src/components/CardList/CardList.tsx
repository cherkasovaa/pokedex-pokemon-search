import { DetailedCard } from '@/components/DetailedCard';
import { SimpleCard } from '@/components/SimpleCard';
import type { CardListProps } from '@/types/interfaces';
import { isDetailedPokemon } from '@/types/typeGuards';
import { Component } from 'react';

export class CardList extends Component<CardListProps> {
  render() {
    const { results } = this.props;

    return (
      <div className="flex flex-wrap justify-center  p-4 overflow-auto">
        {results.map((pokemon) =>
          isDetailedPokemon(pokemon) ? (
            <DetailedCard key={pokemon.id} pokemon={pokemon} />
          ) : (
            <SimpleCard key={pokemon.name} pokemon={pokemon} />
          )
        )}
      </div>
    );
  }
}
