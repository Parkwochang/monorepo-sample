import { ChurchEntity } from '@workspace/http/must/church';
import { ScheduleEntity } from '@workspace/http/must/schedule';

// ----------------------------------------------------------------------
// prettier-ignore

export const CREATE_CHURCH_FORM = {
  churchName: '',
  pastorName: '',
  address   : '',
  phone     : '',
  email     : '',
} as ChurchEntity.CreateChurch satisfies ChurchEntity.CreateChurch;

// ----------------------------------------------------------------------
// prettier-ignore

export const CREATE_CHECK_IN_FORM = {
  checkMethod: 'QR_CODE',
  location   : '',
  notes      : '',
};

// ----------------------------------------------------------------------
// prettier-ignore

export const CREATE_CHURCH_SCHEDULE_FORM = {
  title      : '',
  description: '',
  startDate  : '',
  endDate    : '',
  location   : '',
  eventType  : '',
  isAllDay   : false,
  churchId   : 0,
  memberId   : 0,
  notes      : '',
  color      : '',
} as ScheduleEntity.CreateSchedule satisfies ScheduleEntity.CreateSchedule;
