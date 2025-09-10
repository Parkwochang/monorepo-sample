import type { ChurchEntity } from '@workspace/http/must/church';

import { ChurchScreen } from '@/domains/church/components';

// ----------------------------------------------------------------------

export default async function ChurchPage({ searchParams }: { searchParams: Promise<ChurchEntity.ChurchParam> }) {
  const { page = '1', size = '20', ...rest } = await searchParams;

  return <ChurchScreen filters={{ page, size, ...rest }} />;
}
