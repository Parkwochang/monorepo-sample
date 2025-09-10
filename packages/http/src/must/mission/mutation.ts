'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { completeMission, createMission, createMissionSchedule, deleteMission, updateMission } from './api';
import type { MissionEntity } from './dto';
import { MISSION_URL, MISSION_SCHEDULE_URL } from '../url';

// ----------------------------------------------------------------------

export const useCreateMission = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.CreateMission) => createMission(data),
    meta: {
      successMessage: '미션 템플릿이 성공적으로 생성되었습니다.',
      errorMessage: '미션 템플릿 생성에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_URL.missions],
    },
  });
};

export const useUpdateMission = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<MissionEntity.Mission>) => updateMission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
      queryClient.invalidateQueries({ queryKey: ['mission', id] });
    },
  });
};

export const useDeleteMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
    },
  });
};

export const useCreateMissionSchedule = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.CreateMissionSchedule) => createMissionSchedule(data),
    meta: {
      successMessage: '미션 일정이 성공적으로 생성되었습니다.',
      errorMessage: '미션 일정 생성에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_SCHEDULE_URL.schedules],
    },
  });
};

export const useCompleteMission = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.CompleteMission) => completeMission(data),
  });
};
