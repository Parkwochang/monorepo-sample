import { ChurchUpdateScreen } from '@/domains/church/components';

// ----------------------------------------------------------------------

export default async function ChurchUpdatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <ChurchUpdateScreen id={Number(id)} />;
}
