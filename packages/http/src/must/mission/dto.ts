import z from 'zod';

// ----------------------------------------------------------------------
// ! 미션 템플릿
// prettier-ignore

export const MissionDto = z.object({
  id: z.number(),
  churchId: z.number().optional(),
  title: z.string(),
  description: z.string(),
  missionType: z.enum(['WRITE', 'FILL', 'MULTI']),
  difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  talentReward: z.number(),
  rightAnswer: z.string().optional(),
  multipleChoice: z.string().optional(),
  searchStartDate: z.string().datetime().optional(),
  searchEndDate: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isActive: z.boolean(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionListDto = z.object({
  page: z.number(),
  size: z.number(),
  sort: z.string().optional(),
});
// rightAnswer

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))).optional().default('10'),
  title          : z.string().optional(),
  missionType    : z.enum(['WRITE', 'FILL', 'MULTI']).optional(), // (쓰기:WRITE, 채우기:FILL, 객관식:MULTI)
  difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
  talentReward   : z.number().optional(),
  isActive       : z.boolean().optional(),
  searchStartDate: z.string().optional(),
  searchEndDate  : z.string().optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateMissionDto = z.object({
  title          : z.string().min(1, '제목을 입력해주세요'),
  description    : z.string().min(1, '설명을 입력해주세요'),
  missionType    : z.enum(['WRITE', 'FILL', 'MULTI']).default('MULTI'),
  missionKindType: z.enum(['OX', 'MULTI']).default('OX').optional(),
  rightAnswer    : z.string().min(1, '정답을 입력해주세요').optional(),
  multipleChoice : z.string().min(1, '선택지를 입력해주세요').optional(),
  difficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('BEGINNER'),
  talentReward   : z.string().or(z.number()).transform((val) => Number(val)),
});

export const UpdateMissionDto = CreateMissionDto.extend({
  id: z.number(),
});

// ----------------------------------------------------------------------
// ! 미션 스케줄
// prettier-ignore

export const CreateMissionScheduleDto = z.object({
  templateId   : z.number(),
  churchId     : z.number().optional(),
  weekStartDate: z.string().date(),
  weekEndDate  : z.string().date(),
  missionOrder : z.number(),
  description  : z.string(),
});

export const UpdateMissionScheduleDto = CreateMissionScheduleDto.extend({
  id: z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionScheduleResDto = z.object({
  id                     : z.number(),
  templateId             : z.number(),
  churchId               : z.number(),
  weekStartDate          : z.string().date(),
  weekEndDate            : z.string().date(),
  missionOrder           : z.number(),
  description            : z.string(),
  isRightAnswer          : z.boolean().optional(),
  templateTitle          : z.string(),
  templateDescription    : z.string(),
  templateMissionType    : z.enum(['WRITE', 'FILL', 'MULTI']),
  templateMissionTypeName: z.string(),
  templateDifficultyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  templateTalentReward   : z.number(),
  templateRightAnswer    : z.string().optional(),
  templateMultipleChoice : z.string().optional(),
  templateLinkUrl        : z.string().optional(),
  isExecution            : z.boolean().optional(),
  isApproved             : z.boolean().optional(),
  execution              : z.string().optional(),
  createdAt              : z.string().datetime(),
  updatedAt              : z.string().datetime(),
  isActive               : z.boolean(),
});

// ----------------------------------------------------------------------
// ! 미션 스케줄 오늘 날짜 조회
// prettier-ignore

export const MissionScheduleTodayResDto = z.object({
  id           : z.number(),
  templateId   : z.number(),
  churchId     : z.number(),
  weekStartDate: z.string().date(),
  weekEndDate  : z.string().date(),
  missionOrder : z.number(),
  description  : z.string(),
});

// ----------------------------------------------------------------------
// ! 미션 수행
// prettier-ignore

export const CompleteMissionDto = z.object({
  scheduleId   : z.number(), // * 미션일정ID
  // churchId     : z.number(),
  // memberId     : z.number(),
  missionId    : z.number(), // * 미션템플릿ID
  excutionText : z.string(), // * 수행내용
  isRightAnswer: z.boolean(), // 정답여부
});

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionExecutionResDto = z.object({
  id                  : z.number(),
  scheduleId          : z.number(),
  churchId            : z.number(),
  churchName          : z.string(),
  memberId            : z.number(),
  memberName          : z.string(),
  templateId          : z.number(),
  templateName        : z.string(),
  talentReward        : z.number(),
  excutionText        : z.string(),
  excutionDate        : z.string().datetime(),
  isRightAnswer       : z.boolean(),
  status              : z.enum(['NOT_STARTED', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  reviewedBy          : z.number().optional(),
  reviewedByName      : z.string().optional(),
  reviewedAt          : z.string().datetime().optional(),
  reviewComment       : z.string().optional(),
  talentsTransactionId: z.number().optional(),
  createdAt           : z.string().datetime(),
  createdBy           : z.number(),
  createdByName       : z.string(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionExecutionParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))).optional().default('10'),
  searchStartDate: z.string().optional(),
  searchEndDate  : z.string().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionExecutionApproveDto = z.object({
  id           : z.number(),
  status       : z.enum(['NOT_STARTED', 'SUBMITTED', 'APPROVED', 'REJECTED']),
  reviewComment: z.string().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const MissionExecutionApproveListDto = z.array(MissionExecutionApproveDto)

// ----------------------------------------------------------------------
// prettier-ignore

export namespace MissionEntity {
  export type Mission                 = z.infer<typeof MissionDto>;
  export type MissionList             = z.infer<typeof MissionListDto>;
  export type MissionParams           = z.input<typeof MissionParamsDto>;
  export type CreateMission           = z.input<typeof CreateMissionDto>;
  export type UpdateMission           = z.input<typeof UpdateMissionDto>;
  // ! 미션 스케줄
  export type CreateMissionSchedule   = z.input<typeof CreateMissionScheduleDto>;
  export type UpdateMissionSchedule   = z.input<typeof UpdateMissionScheduleDto>;
  export type MissionScheduleRes      = z.infer<typeof MissionScheduleResDto>;
  export type MissionScheduleTodayRes = z.infer<typeof MissionScheduleTodayResDto>;
  // ! 미션 수행
  export type CompleteMission         = z.input<typeof CompleteMissionDto>;
  export type MissionExecutionRes       = z.infer<typeof MissionExecutionResDto>;
  export type MissionExecutionParams    = z.input<typeof MissionExecutionParamsDto>;
  export type MissionExecutionApprove   = z.input<typeof MissionExecutionApproveDto>;
  export type MissionExecutionApproveList = z.infer<typeof MissionExecutionApproveListDto>;
}
