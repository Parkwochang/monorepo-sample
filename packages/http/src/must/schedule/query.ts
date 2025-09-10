'use client';

import { useQuery } from '@tanstack/react-query';

import { getScheduleById, getSchedules } from './api';
import type { ScheduleEntity } from './dto';
import { CHURCH_SCHEDULE_URL } from '../url';

// ----------------------------------------------------------------------

export const useGetSchedules = (params: ScheduleEntity.ScheduleParams) => {
  return useQuery({
    queryKey: [CHURCH_SCHEDULE_URL.schedules, params],
    queryFn: () => getSchedules(params),
  });
};

export const useGetScheduleById = (id: number) => {
  return useQuery({
    queryKey: [CHURCH_SCHEDULE_URL.scheduleById(id)],
    queryFn: () => getScheduleById(id),
  });
};
