import { getPokemonByName } from '@/api/getPokemonByName';
import type { PokemonDetails } from '@/types/interfaces';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const idsString = searchParams.get('ids');

    if (!idsString) {
      return new NextResponse('There is no "ids" query parameter', {
        status: 400,
      });
    }

    const pokemonIds = idsString.split(',');

    if (pokemonIds.length === 0) {
      return new NextResponse(
        'Invalid input: "ids" must be a non-empty comma-separated string',
        { status: 400 }
      );
    }

    const promises = pokemonIds.map((id: string) => getPokemonByName(id));
    const result = await Promise.all(promises);
    const pokemons = result.flat().filter((p): p is PokemonDetails => !!p);

    if (pokemons.length === 0) {
      return new NextResponse('No pokemon data found', {
        status: 404,
      });
    }

    const headers = ['ID', 'Name', 'Stat_Name', 'Stat_Value'];
    const rows = pokemons.flatMap((pokemon) =>
      pokemon.stats.map((stat) =>
        [
          `"${pokemon.id}"`,
          `"${pokemon.name}"`,
          `"${stat.name}"`,
          `"${stat.base_stat}"`,
        ].join(',')
      )
    );
    const csvContent = [headers.join(','), ...rows].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${pokemons.length}_pokemon.csv"`,
      },
    });
  } catch (error) {
    console.error('[API_EXPORT_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
