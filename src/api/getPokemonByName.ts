import { BASE_URL } from '@/api/constants';
import type { PokemonDetails } from '@/types/interfaces';
import { isPokemonData } from '@/types/typeGuards';

export const getPokemonByName = async (
  searchTerm: string
): Promise<PokemonDetails[]> => {
  const response = await fetch(`${BASE_URL}/pokemon/${searchTerm}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Pokemon "${searchTerm}" not found.`);
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isPokemonData(data)) {
    throw new Error('Invalid pokemon data received from API');
  }

  return [
    {
      id: data.id,
      name: data.name,
      sprites: {
        front_default: data.sprites.front_default,
      },
      stats: data.stats.map((stat) => ({
        base_stat: stat.base_stat,
        name: stat.stat.name,
      })),
    },
  ];
};
