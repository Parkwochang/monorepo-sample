'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  MissionExecutionApproveDto,
  UpdateMissionDto,
  UpdateMissionScheduleDto,
  type MissionEntity,
} from '@workspace/http/must/mission';

import {
  useUpdateMissionExecutionApproveMutation,
  useUpdateMissionMutation,
  useUpdateMissionScheduleMutation,
} from './mutations';
import { CREATE_MISSION_FORM } from '@/config/form';

// ----------------------------------------------------------------------
// ! 미션 템플릿

export const useUpdateMissionTemplate = (template: MissionEntity.Mission) => {
  const form = useForm({
    values: { ...CREATE_MISSION_FORM, ...template },
    resolver: zodResolver(UpdateMissionDto),
  });

  const { mutateAsync: updateMission, isPending } = useUpdateMissionMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    await updateMission(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};

// ----------------------------------------------------------------------
// ! 미션 일정

export const useUpdateMissionSchedule = (schedule: MissionEntity.MissionScheduleRes) => {
  const form = useForm({
    values: schedule,
    resolver: zodResolver(UpdateMissionScheduleDto),
  });

  const { mutateAsync: updateMissionSchedule, isPending } = useUpdateMissionScheduleMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    await updateMissionSchedule(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};

// ----------------------------------------------------------------------
// ! 미션 수행

export const useApproveMissionExecution = (execution: MissionEntity.MissionExecutionRes) => {
  const form = useForm({
    values: {
      id: execution.id,
      status: 'APPROVED',
      reviewComment: '',
    },
    resolver: zodResolver(MissionExecutionApproveDto),
  });

  const { mutateAsync: approveMissionExecution, isPending } = useUpdateMissionExecutionApproveMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    await approveMissionExecution(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};

export const useRejectMissionExecution = (execution: MissionEntity.MissionExecutionRes) => {
  const form = useForm({
    values: {
      id: execution.id,
      status: 'REJECTED',
      reviewComment: '',
    },
    resolver: zodResolver(MissionExecutionApproveDto),
  });

  const { mutateAsync: rejectMissionExecution, isPending } = useUpdateMissionExecutionApproveMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    await rejectMissionExecution(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};
