import { DetailsPanel } from '@/components';

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <DetailsPanel id={id} />;
}
