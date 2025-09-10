'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  completeMission,
  createMission,
  createMissionSchedule,
  deleteMission,
  deleteMissionExecution,
  deleteMissionSchedule,
  updateMission,
  updateMissionExecutionApprove,
  updateMissionExecutionApproveList,
  updateMissionSchedule,
} from '@workspace/http/must/mission';
import type { MissionEntity } from '@workspace/http/must/mission';
import { MISSION_URL, MISSION_SCHEDULE_URL, MISSION_EXECUTION_URL } from '@workspace/http/must/url';

// ----------------------------------------------------------------------
// ! 미션 템플릿

export const useCreateMissionMutation = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.CreateMission) => createMission(data),
    meta: {
      successMessage: '미션 템플릿이 성공적으로 생성되었습니다.',
      errorMessage: '미션 템플릿 생성에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_URL.missions],
    },
  });
};

export const useUpdateMissionMutation = () => {
  return useMutation({
    mutationFn: (data: Partial<MissionEntity.UpdateMission>) => updateMission(data),
    meta: {
      successMessage: '미션 템플릿이 성공적으로 수정되었습니다.',
      errorMessage: '미션 템플릿 수정에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_URL.missions],
    },
  });
};

export const useDeleteMissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteMission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missions'] });
    },
  });
};

// ----------------------------------------------------------------------
// ! 미션 일정

export const useCreateMissionScheduleMutation = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.CreateMissionSchedule) => createMissionSchedule(data),
    meta: {
      successMessage: '미션 일정이 성공적으로 생성되었습니다.',
      errorMessage: '미션 일정 생성에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_SCHEDULE_URL.schedules],
    },
  });
};

export const useUpdateMissionScheduleMutation = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.UpdateMissionSchedule) => updateMissionSchedule(data),
    meta: {
      successMessage: '미션 일정이 성공적으로 수정되었습니다.',
      errorMessage: '미션 일정 수정에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_SCHEDULE_URL.schedules],
    },
  });
};

export const useDeleteMissionScheduleMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteMissionSchedule(id),
    meta: {
      successMessage: '미션 일정이 성공적으로 삭제되었습니다.',
      errorMessage: '미션 일정 삭제에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_SCHEDULE_URL.schedules],
    },
  });
};

// ----------------------------------------------------------------------
// ! 미션 수행

export const useCompleteMissionMutation = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.CompleteMission) => completeMission(data),
  });
};

export const useDeleteMissionExecutionMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteMissionExecution(id),
    meta: {
      successMessage: '미션 수행이 성공적으로 삭제되었습니다.',
      errorMessage: '미션 수행 삭제에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_EXECUTION_URL.executions],
    },
  });
};

export const useUpdateMissionExecutionApproveMutation = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.MissionExecutionApprove) => updateMissionExecutionApprove(data),
    meta: {
      successMessage: '미션 수행 승인이 성공적으로 처리되었습니다.',
      errorMessage: '미션 수행 승인 처리에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MISSION_EXECUTION_URL.executions],
    },
  });
};

export const useUpdateMissionExecutionApproveListMutation = () => {
  return useMutation({
    mutationFn: (data: MissionEntity.MissionExecutionApproveList) => updateMissionExecutionApproveList(data),
  });
};
