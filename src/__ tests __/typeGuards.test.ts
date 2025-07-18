import {
  baseDetailedPokemon,
  baseSimplePokemon,
  mockPokemonAPIResponse,
} from '@/__ tests __/utils/mock-constants';
import { isDetailedPokemon, isObject, isPokemonData } from '@/types/typeGuards';
import { describe, expect, test } from 'vitest';

describe('type guards', () => {
  describe('isObject', () => {
    const invalidPokemonData = [null, undefined, 'string', 123, true];

    test('returns true if existing data is an object', () => {
      const value = isObject(mockPokemonAPIResponse);

      expect(value).toBe(true);
    });

    test.each(invalidPokemonData)('returns false for value %s', (data) => {
      const value = isObject(data);

      expect(value).toBe(false);
    });
  });

  describe('isPokemonData', () => {
    const invalidCases = [
      {
        description: 'when data is not an object',
        data: null,
      },
      {
        description: 'when id is missing',
        data: { ...mockPokemonAPIResponse, id: null },
      },
      {
        description: 'when id is not a number',
        data: { ...mockPokemonAPIResponse, id: '1' },
      },
      {
        description: 'when name is missing',
        data: { ...mockPokemonAPIResponse, name: null },
      },
      {
        description: 'when sprites are missing',
        data: { ...mockPokemonAPIResponse, sprites: null },
      },
      {
        description: 'when front_default is missing',
        data: { ...mockPokemonAPIResponse, sprites: {} },
      },
      {
        description: 'when stats are missing',
        data: { ...mockPokemonAPIResponse, stats: null },
      },
      {
        description: 'when stats is not an array',
        data: { ...mockPokemonAPIResponse, stats: {} },
      },
      {
        description: 'when a stat item is malformed',
        data: { ...mockPokemonAPIResponse, stats: { base_stat: 90 } },
      },
    ];

    test('returns true if existing data has interface PokemonAPIResponse', () => {
      const value = isPokemonData(mockPokemonAPIResponse);

      expect(value).toBe(true);
    });

    test.each(invalidCases)('returns false $description', ({ data }) => {
      const value = isPokemonData(data);

      expect(value).toBe(false);
    });
  });

  describe('isDetailedPokemon', () => {
    test('returns true for a complete PokemonDetails object', () => {
      const value = isDetailedPokemon(baseDetailedPokemon);

      expect(value).toBe(true);
    });

    test('returns false for a simple Pokemon object', () => {
      const value = isDetailedPokemon(baseSimplePokemon);

      expect(value).toBe(false);
    });
  });
});
