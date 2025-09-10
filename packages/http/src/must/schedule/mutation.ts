'use client';

import { useMutation } from '@tanstack/react-query';

import type { ScheduleEntity } from './dto';
import { CHURCH_SCHEDULE_URL } from '../url';
import { createSchedule, deleteSchedule, updateSchedule } from './api';

// // ----------------------------------------------------------------------

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: (data: ScheduleEntity.CreateSchedule) => createSchedule(data),
    meta: {
      successMessage: '일정이 생성되었습니다.',
      errorMessage: '일정 생성에 실패했습니다.',
      invalidateQueries: [CHURCH_SCHEDULE_URL.schedules],
    },
  });
};

export const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: (json: { id: number; data: ScheduleEntity.CreateSchedule }) => updateSchedule(json.id, json.data),
    meta: {
      successMessage: '일정이 수정되었습니다.',
      errorMessage: '일정 수정에 실패했습니다.',
      invalidateQueries: (id: number) => [CHURCH_SCHEDULE_URL.scheduleById(id), CHURCH_SCHEDULE_URL.schedules],
    },
  });
};

export const useDeleteSchedule = () => {
  return useMutation({
    mutationFn: (id: number) => deleteSchedule(id),
    meta: {
      successMessage: '일정이 삭제되었습니다.',
      errorMessage: '일정 삭제에 실패했습니다.',
      invalidateQueries: (id: number) => [CHURCH_SCHEDULE_URL.scheduleById(id), CHURCH_SCHEDULE_URL.schedules],
    },
  });
};
