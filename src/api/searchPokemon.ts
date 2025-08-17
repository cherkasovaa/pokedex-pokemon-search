import { getAllPokemons } from '@/api/getAllPokemons';
import { getPokemonByName } from '@/api/getPokemonByName';
import { ITEMS_PER_PAGE } from '@/config/constants';
import type { PokemonListData } from '@/types/interfaces';

export const searchPokemon = async (
  searchTerm: string,
  page = 1,
  limitPerPage = ITEMS_PER_PAGE
): Promise<PokemonListData> => {
  try {
    if (searchTerm) {
      const pokemonDetails = await getPokemonByName(searchTerm);

      return {
        results: pokemonDetails,
        totalCount: 1,
      };
    }

    return await getAllPokemons(page, limitPerPage);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
