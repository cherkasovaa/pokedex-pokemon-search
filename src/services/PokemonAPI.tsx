import type {
  Pokemon,
  PokemonDetails,
  PokemonListResponse,
} from '@/types/interfaces';
import { isPokemonData } from '@/types/typeGuards';

export default class PokemonAPI {
  private static instance: PokemonAPI;
  private baseURL = 'https://pokeapi.co/api/v2/';

  static getInstance() {
    if (!PokemonAPI.instance) {
      PokemonAPI.instance = new PokemonAPI();
    }

    return PokemonAPI.instance;
  }

  async searchPokemons(
    searchTerm: string,
    signal?: AbortSignal
  ): Promise<Pokemon[] | PokemonDetails[]> {
    try {
      if (!searchTerm) {
        return await this.getAllPokemons(signal);
      }

      return await this.getPokemonByName(searchTerm, signal);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return [];
      }

      console.error('API Error:', error);
      throw error;
    }
  }

  async getAllPokemons(signal?: AbortSignal): Promise<Pokemon[]> {
    const response = await fetch(`${this.baseURL}/pokemon?limit=20`, {
      signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PokemonListResponse = await response.json();
    return data.results;
  }

  async getPokemonByName(
    searchTerm: string,
    signal?: AbortSignal
  ): Promise<PokemonDetails[]> {
    const response = await fetch(`${this.baseURL}/pokemon/${searchTerm}`, {
      signal,
    });

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
  }
}

export const pokemonAPI = PokemonAPI.getInstance();
