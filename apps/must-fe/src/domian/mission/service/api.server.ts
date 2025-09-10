'use server';

import { httpServerInstance } from '@workspace/http/lib';
import { MISSION_SCHEDULE_URL } from '@workspace/http/must/url';
import type { MissionEntity } from '@workspace/http/must/mission';
import type { ResJson } from '@workspace/http/types/app';

import { withThrowOnError } from '@/shared/service';

// ----------------------------------------------------------------------

export const getMissionSchedulesTodayServer = async () => {
  const { data } = await withThrowOnError(
    httpServerInstance.get(MISSION_SCHEDULE_URL.today).json<ResJson<MissionEntity.MissionScheduleRes[]>>(),
  );

  return data.find((item) => item.templateMissionType === 'MULTI');
};
