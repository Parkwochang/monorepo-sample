import { MustInstance } from '@workspace/http/lib';
import { MISSION_URL, MISSION_SCHEDULE_URL, MISSION_EXECUTION_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { MissionParamsDto, type MissionEntity } from './dto';

// ----------------------------------------------------------------------
// ! 미션 템플릿

export const getMissions = async (params: MissionEntity.MissionParams) => {
  const searchParams = MissionParamsDto.parse(params);

  const { data } = await MustInstance.get(MISSION_URL.missions, {
    searchParams,
  }).json<PaginationList<MissionEntity.Mission>>();

  return data;
};

export const getMissionById = async (id: number) => {
  const res = await MustInstance.get(MISSION_URL.missionById(id)).json<ResJson<MissionEntity.Mission>>();

  return res;
};

export const createMission = async (json: MissionEntity.CreateMission) => {
  const res = await MustInstance.post(MISSION_URL.mission, {
    json,
  }).json<ResJson<MissionEntity.Mission>>();

  return res;
};

export const updateMission = async (json: Partial<MissionEntity.UpdateMission>) => {
  const res = await MustInstance.patch(MISSION_URL.mission, {
    json,
  }).json<ResJson<MissionEntity.Mission>>();

  return res;
};

export const deleteMission = async (id: number) => {
  const res = await MustInstance.delete(MISSION_URL.missionById(id)).json<ResJson<void>>();

  return res;
};

// ----------------------------------------------------------------------
// ! 미션 일정

export const getMissionSchedulesToday = async () => {
  const { data } = await MustInstance.get(MISSION_SCHEDULE_URL.today).json<
    ResJson<MissionEntity.MissionScheduleRes[]>
  >();

  return data;
};

export const getMissionSchedules = async (params: MissionEntity.MissionParams) => {
  const searchParams = MissionParamsDto.parse(params);

  const { data } = await MustInstance.get(MISSION_SCHEDULE_URL.schedules, {
    searchParams,
  }).json<PaginationList<MissionEntity.MissionScheduleRes>>();

  return data;
};

export const getMissionScheduleById = async (id: number) => {
  const { data } = await MustInstance.get(MISSION_SCHEDULE_URL.scheduleById(id)).json<
    ResJson<MissionEntity.MissionScheduleRes>
  >();

  return data;
};

export const createMissionSchedule = async (json: MissionEntity.CreateMissionSchedule) => {
  const res = await MustInstance.post(MISSION_SCHEDULE_URL.schedule, {
    json,
  }).json<ResJson<null>>();

  return res;
};

export const updateMissionSchedule = async (json: MissionEntity.UpdateMissionSchedule) => {
  const res = await MustInstance.patch(MISSION_SCHEDULE_URL.schedule, {
    json,
  }).json<ResJson<null>>();

  return res;
};

export const deleteMissionSchedule = async (id: number) => {
  const res = await MustInstance.delete(MISSION_SCHEDULE_URL.scheduleById(id)).json<ResJson<void>>();

  return res;
};

// ----------------------------------------------------------------------
// ! 미션 수행

export const completeMission = async (json: MissionEntity.CompleteMission) => {
  const res = await MustInstance.post(MISSION_EXECUTION_URL.execution, {
    json,
  }).json<ResJson<null>>();

  return res;
};

export const getMissionExecutions = async (params: MissionEntity.MissionParams) => {
  const searchParams = MissionParamsDto.parse(params);

  const { data } = await MustInstance.get(MISSION_EXECUTION_URL.executions, {
    searchParams,
  }).json<PaginationList<MissionEntity.MissionExecutionRes>>();

  return data;
};

export const getMissionExecutionById = async (id: number) => {
  const { data } = await MustInstance.get(MISSION_EXECUTION_URL.executionById(id)).json<
    ResJson<MissionEntity.MissionExecutionRes>
  >();

  return data;
};

export const deleteMissionExecution = async (id: number) => {
  const res = await MustInstance.delete(MISSION_EXECUTION_URL.executionById(id)).json<ResJson<void>>();

  return res;
};

export const updateMissionExecutionApprove = async (json: MissionEntity.MissionExecutionApprove) => {
  const res = await MustInstance.patch(MISSION_EXECUTION_URL.excutionApprove, {
    json,
  }).json<ResJson<null>>();

  return res;
};

export const updateMissionExecutionApproveList = async (json: MissionEntity.MissionExecutionApproveList) => {
  const res = await MustInstance.patch(MISSION_EXECUTION_URL.excutionApproveList, {
    json,
  }).json<ResJson<null>>();

  return res;
};
