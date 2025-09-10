import { MustInstance } from '@workspace/http/lib';
import { CHURCH_SCHEDULE_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { ScheduleParamsDto, type ScheduleEntity } from './dto';

// ----------------------------------------------------------------------
// ! 교회 일정

export const getSchedules = async (params: ScheduleEntity.ScheduleParams) => {
  const searchParams = ScheduleParamsDto.parse(params);

  const { data } = await MustInstance.get(CHURCH_SCHEDULE_URL.schedules, {
    searchParams,
  }).json<PaginationList<ScheduleEntity.ScheduleResponse>>();

  return data;
};

export const getScheduleById = async (id: number) => {
  const res = await MustInstance.get(CHURCH_SCHEDULE_URL.scheduleById(id)).json<
    ResJson<ScheduleEntity.ScheduleResponse>
  >();

  return res;
};

export const createSchedule = async (json: ScheduleEntity.CreateSchedule) => {
  const { message } = await MustInstance.post(CHURCH_SCHEDULE_URL.schedule, {
    json,
  }).json<ResJson<ScheduleEntity.ScheduleResponse>>();

  return message;
};

export const updateSchedule = async (id: number, data: Partial<ScheduleEntity.ScheduleResponse>) => {
  const { message } = await MustInstance.patch(CHURCH_SCHEDULE_URL.scheduleById(id), {
    json: data,
  }).json<ResJson<ScheduleEntity.ScheduleResponse>>();

  return message;
};

export const deleteSchedule = async (id: number) => {
  const { message } = await MustInstance.delete(CHURCH_SCHEDULE_URL.scheduleById(id)).json<ResJson<void>>();

  return message;
};
