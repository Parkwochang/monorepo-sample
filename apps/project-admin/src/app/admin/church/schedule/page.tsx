import { ChurchScheduleScreen } from '@/domains/church/components';
import { type ChurchEntity } from '@workspace/http/must/church/dto';

interface ChurchSchedulePageProps {
  searchParams: Promise<ChurchEntity.ChurchParam>;
}

export default async function ChurchSchedulePage({ searchParams }: ChurchSchedulePageProps) {
  const filters = await searchParams;

  return <ChurchScheduleScreen filters={filters} />;
}
