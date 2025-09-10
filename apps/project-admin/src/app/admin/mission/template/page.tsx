import { MissionScreen } from '@/domains/mission/components';
import { type MissionEntity } from '@workspace/http/must/mission';

export default async function MissionTemplatePage({
  searchParams,
}: {
  searchParams: Promise<MissionEntity.MissionParams>;
}) {
  const filters = await searchParams;

  return <MissionScreen filters={filters} />;
}
