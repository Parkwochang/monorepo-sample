import { cn } from '@workspace/ui/lib';
import { Text } from '@workspace/ui/components/text';

import {
  MISSION_EXECUTION_STATUS_MAP,
  ACTIVE_STATUS_MAP_COLOR,
  MISSION_EXECUTION_STATUS_MAP_COLOR,
} from '@/config/config-map';

// ----------------------------------------------------------------------

export const ActiveStatusBtn = ({ active }: { active: boolean }) => {
  const status = active ? '활성' : '비활성';

  return (
    <Text size={'sm'} className={cn('text-white px-2 py-1 rounded-md', ACTIVE_STATUS_MAP_COLOR[status])}>
      {status}
    </Text>
  );
};

export const MemberPermissionBtn = () => {};

export const MissionTypeBtn = () => {};

export const MissionLevelBtn = () => {};

export const MissionStatusBtn = ({ status }: { status: keyof typeof MISSION_EXECUTION_STATUS_MAP }) => {
  return (
    <Text size={'sm'} className={cn(MISSION_EXECUTION_STATUS_MAP_COLOR[status], 'text-white px-2 py-[6px] rounded-md')}>
      {MISSION_EXECUTION_STATUS_MAP[status]}
    </Text>
  );
};
