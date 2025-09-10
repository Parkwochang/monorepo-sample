'use client';

import { useQuery } from '@tanstack/react-query';

import { MISSION_URL, MISSION_SCHEDULE_URL } from '@workspace/http/must/url';
import { MissionEntity } from '@workspace/http/must/mission';
import {
  getMissionById,
  getMissions,
  getMissionScheduleById,
  getMissionSchedules,
  getMissionSchedulesToday,
} from '@workspace/http/must/mission/api';

// ----------------------------------------------------------------------

export const useMissionsQuery = (params: MissionEntity.MissionParams) => {
  return useQuery({
    queryKey: [MISSION_URL.missions, params],
    queryFn: () => getMissions(params),
  });
};

export const useGetMission = (id: number) => {
  return useQuery({
    queryKey: ['mission', id],
    queryFn: () => getMissionById(id),
  });
};

export const useGetMissionSchedules = (params: MissionEntity.MissionParams) => {
  return useQuery({
    queryKey: [MISSION_SCHEDULE_URL.schedules, params],
    queryFn: () => getMissionSchedules(params),
  });
};

export const useGetMissionScheduleById = (id: number) => {
  return useQuery({
    queryKey: [MISSION_SCHEDULE_URL.scheduleById(id)],
    queryFn: () => getMissionScheduleById(id),
  });
};

export const useGetMissionSchedulesToday = () => {
  return useQuery({
    queryKey: [MISSION_SCHEDULE_URL.today],
    queryFn: () => getMissionSchedulesToday(),
  });
};
