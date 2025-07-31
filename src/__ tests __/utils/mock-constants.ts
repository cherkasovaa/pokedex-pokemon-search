import type { Pokemon, PokemonDetails } from '@/types/interfaces';

export const SEARCH_KEY = 'searchTerm';
export const BASE_SEARCH_TERM = 'ditto';
export const SAVED_TERM = 'ditto';
export const EMPTY_VALUE = '';
export const BTN_SEARCH_TEXT = 'Search';
export const BTN_ERROR_TEXT = 'Error';

export const baseSimplePokemon: Pokemon = {
  name: BASE_SEARCH_TERM,
  url: 'url/pokemon/1',
};
export const mockSimplePokemonList = [
  baseSimplePokemon,
  { name: 'pikachu', url: 'url/pokemon/2' },
];
export const baseDetailedPokemon: PokemonDetails = {
  id: 1,
  name: BASE_SEARCH_TERM,
  sprites: { front_default: 'url/to/image.png' },
  stats: [
    { base_stat: 30, name: 'hp' },
    { base_stat: 50, name: 'attack' },
  ],
};
export const mockPokemonAPIResponse = {
  id: 1,
  name: BASE_SEARCH_TERM,
  sprites: {
    front_default: 'url/to/image.png',
  },
  stats: [
    {
      base_stat: 30,
      stat: { name: 'hp' },
    },
    {
      base_stat: 50,
      stat: { name: 'attack' },
    },
  ],
};

export const isDetailedPokemonMock = (
  pokemon: Pokemon | PokemonDetails
): pokemon is PokemonDetails => 'id' in pokemon;
