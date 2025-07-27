import { BASE_URL } from '@/api/constants';
import type { Pokemon, PokemonListResponse } from '@/types/interfaces';

export const getAllPokemons = async (
  page = 1,
  limitPerPage: number
): Promise<{
  results: Pokemon[];
  totalCount: number;
}> => {
  const offset = (page - 1) * limitPerPage;

  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limitPerPage}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PokemonListResponse = await response.json();
  return { results: data.results, totalCount: data.count };
};
