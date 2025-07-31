import type { PokemonDetails } from '@/types/interfaces';

export const exportToCsv = (data: PokemonDetails[]) => {
  if (data.length === 0) return;

  const headers = ['ID', 'Name', 'Stat_Name', 'Stat_Value'];

  const rows = data.flatMap((pokemon) =>
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

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = `${data.length}_item${data.length > 1 ? 's' : ''}.csv`;

  link.click();
  URL.revokeObjectURL(link.href);
};
