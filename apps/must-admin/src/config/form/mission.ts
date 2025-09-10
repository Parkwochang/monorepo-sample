import { type MissionEntity } from '@workspace/http/must/mission';

// ----------------------------------------------------------------------
// prettier-ignore

export const CREATE_MISSION_FORM = {
  title          : '',
  description    : '',
  talentReward   : 0,
  missionType    : 'MULTI',
  missionKindType: 'OX',
  rightAnswer    : '',
  multipleChoice : 'true,false',
  difficultyLevel: 'BEGINNER',
} as MissionEntity.CreateMission satisfies MissionEntity.CreateMission;

// ----------------------------------------------------------------------
// prettier-ignore

export const CREATE_MISSION_SCHEDULE_FORM = {
  description  : '',
  templateId   : 0,
  churchId     : undefined,
  weekStartDate: '',
  weekEndDate  : '',
  missionOrder : 0,
} as MissionEntity.CreateMissionSchedule satisfies MissionEntity.CreateMissionSchedule;
