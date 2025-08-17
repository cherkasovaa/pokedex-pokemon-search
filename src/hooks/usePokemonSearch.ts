import { searchPokemon } from '@/api/searchPokemon';
import { ITEMS_PER_PAGE } from '@/config/constants';
import type { PokemonListData } from '@/types/interfaces';
import { useQuery } from '@tanstack/react-query';

export const usePokemonSearch = (
  searchTerm: string,
  currentPage = 1,
  initialData?: PokemonListData
) => {
  return useQuery({
    queryKey: ['pokemons', searchTerm, currentPage],

    queryFn: () => searchPokemon(searchTerm, currentPage, ITEMS_PER_PAGE),
    initialData: initialData,
    staleTime: 1000 * 60 * 5,
  });
};
