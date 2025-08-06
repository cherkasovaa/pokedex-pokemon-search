import { getPokemonByName } from '@/api/getPokemonByName';
import type { PokemonDetails } from '@/types/interfaces';
import { useQueries } from '@tanstack/react-query';

export const useSelectedPokemons = (selectedItems: string[]) => {
  const queries = selectedItems.map((id) => ({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonByName(id),
    enabled: !!id,
  }));

  const results = useQueries({ queries });

  const data = results
    .map((query) => query.data?.[0])
    .filter((pokemon): pokemon is PokemonDetails => !!pokemon);

  return { data };
};
