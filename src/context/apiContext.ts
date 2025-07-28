import { createApiContext } from '@/context/createApiContext';
import type { Pokemon, PokemonDetails } from '@/types/interfaces';

export type ApiResponse = {
  results: (Pokemon | PokemonDetails)[];
  totalCount: number;
};

export const [ApiProvider, useApiContext] = createApiContext<ApiResponse>();
