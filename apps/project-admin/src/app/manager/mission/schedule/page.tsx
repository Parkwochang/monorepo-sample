import { MissionScheduleScreen } from '@/domains/mission/components';
import { type MissionEntity } from '@workspace/http/must/mission';

export default async function ManagerMissionSchedulePage({
  searchParams,
}: {
  searchParams: Promise<MissionEntity.MissionParams>;
}) {
  const filters = await searchParams;

  return <MissionScheduleScreen filters={filters} />;
}
