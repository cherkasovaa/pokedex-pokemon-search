import { searchPokemon } from '@/api/searchPokemon';
import { ITEMS_PER_PAGE } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';

export const usePokemonSearch = (searchTerm: string, currentPage = 1) => {
  return useQuery({
    queryKey: ['pokemons', searchTerm, currentPage],

    queryFn: () => searchPokemon(searchTerm, currentPage, ITEMS_PER_PAGE),
  });
};
