import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore

export const ScheduleResDto = z.object({
  id             : z.number(),
  title          : z.string(),
  description    : z.string(),
  startDate      : z.string().datetime(),
  endDate        : z.string().datetime(),
  location       : z.string(),
  eventType      : z.string(),
  isAllDay       : z.boolean(),
  isRecurring    : z.boolean(),
  color          : z.string().regex(/^#([0-9a-fA-F]{6})$/),
  churchId       : z.number(),
  churchName     : z.string(),
  memberId       : z.number(),
  memberName     : z.string(),
  reminderMinutes: z.number(),
  notes          : z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const ScheduleParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))).optional().default('10'),
  searchStartDate: z.string().optional(),
  searchEndDate  : z.string().optional(),
  name           : z.string().optional(),
  email          : z.string().optional(),
  phone          : z.string().optional(),
  role           : z.enum(['MEMBER', 'LEADER', 'ADMIN']).optional(),
  isActive       : z.boolean().optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateScheduleDto = z.object({
  title      : z.string().min(1, '제목을 입력해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  startDate  : z.string().date(),
  endDate    : z.string().date(),
  location   : z.string().min(1, '위치를 입력해주세요').optional(),
  eventType  : z.string().min(1, '이벤트타입을 입력해주세요').optional(),
  isAllDay   : z.boolean().optional(),
  churchId   : z.number().min(1, '교회를 선택해주세요'),
  memberId   : z.number().min(1, '회원을 선택해주세요').optional(),
  notes      : z.string().optional(),
  color      : z.string().regex(/^#([0-9a-fA-F]{6})$/).optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export namespace ScheduleEntity {
  export type ScheduleResponse = z.infer<typeof ScheduleResDto>;
  export type ScheduleParams   = z.input<typeof ScheduleParamsDto>;
  export type CreateSchedule   = z.input<typeof CreateScheduleDto>;
}
