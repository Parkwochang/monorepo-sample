'use client';

import { useQuery } from '@tanstack/react-query';

import {
  getMissionById,
  getMissionExecutionById,
  getMissionExecutions,
  getMissions,
  getMissionScheduleById,
  getMissionSchedules,
  getMissionSchedulesToday,
} from '@workspace/http/must/mission';
import type { MissionEntity } from '@workspace/http/must/mission';
import { MISSION_URL, MISSION_SCHEDULE_URL, MISSION_EXECUTION_URL } from '@workspace/http/must/url';

// ----------------------------------------------------------------------
// ! 미션 템플릿

export const useGetMissions = (params: MissionEntity.MissionParams) => {
  return useQuery({
    queryKey: [MISSION_URL.missions, params],
    queryFn: () => getMissions(params),
  });
};

export const useGetMissionById = (id: number) => {
  return useQuery({
    queryKey: ['mission', id],
    queryFn: () => getMissionById(id),
  });
};

// ----------------------------------------------------------------------
// ! 미션 일정

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

// ----------------------------------------------------------------------
// ! 미션 수행

export const useGetMissionExecutions = (params: MissionEntity.MissionExecutionParams) => {
  return useQuery({
    queryKey: [MISSION_EXECUTION_URL.executions, params],
    queryFn: () => getMissionExecutions(params),
  });
};

export const useGetMissionExecutionById = (id: number) => {
  return useQuery({
    queryKey: [MISSION_EXECUTION_URL.executionById(id)],
    queryFn: () => getMissionExecutionById(id),
  });
};
