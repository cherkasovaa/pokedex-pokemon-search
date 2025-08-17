import { getPokemonByName } from '@/api/getPokemonByName';
import { searchPokemon } from '@/api/searchPokemon';
import { HomePage } from '@/view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; details?: string }>;
}) {
  const sp = await searchParams;

  const query = sp.q || '';
  const details = sp.details || '';
  const currentPage = Number(sp.page) || 1;
  const initialData = await searchPokemon(query, currentPage);

  let detailsData = null;

  if (details) {
    const data = await getPokemonByName(details);
    if (data && data.length > 0) {
      detailsData = data[0];
    }
  }

  return (
    <HomePage
      query={query}
      currentPage={currentPage}
      initialListData={initialData}
      initialDetailsData={detailsData}
    />
  );
}
