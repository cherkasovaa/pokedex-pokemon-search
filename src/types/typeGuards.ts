import type {
  Pokemon,
  PokemonAPIResponse,
  PokemonDetails,
} from '@/types/interfaces';

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

export const isPokemonData = (data: unknown): data is PokemonAPIResponse => {
  if (!isObject(data)) return false;

  return (
    typeof data.id === 'number' &&
    typeof data.name === 'string' &&
    isObject(data.sprites) &&
    typeof data.sprites.front_default === 'string' &&
    Array.isArray(data.stats) &&
    data.stats.every(
      (stat: unknown) =>
        isObject(stat) &&
        typeof stat.base_stat === 'number' &&
        isObject(stat.stat) &&
        typeof stat.stat.name === 'string'
    )
  );
};

export const isDetailedPokemon = (
  pokemon: Pokemon | PokemonDetails
): pokemon is PokemonDetails => {
  return 'id' in pokemon && 'sprites' in pokemon && 'stats' in pokemon;
};
