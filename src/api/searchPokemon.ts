import { getAllPokemons } from '@/api/getAllPokemons';
import { getPokemonByName } from '@/api/getPokemonByName';
import type { Pokemon, PokemonDetails } from '@/types/interfaces';

export const searchPokemon = async (
  searchTerm: string,
  page = 1,
  limitPerPage: number
): Promise<{ results: (Pokemon | PokemonDetails)[]; totalCount: number }> => {
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
