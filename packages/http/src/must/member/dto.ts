import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore
const MemberResDto = z.object({
  id                    : z.number(),
  name                  : z.string(),
  email                 : z.string(),
  phone                 : z.string(),
  churchId              : z.number(),
  churchName            : z.string(),
  role                  : z.enum(['MEMBER', 'LEADER', 'PASTOR', 'ADMIN']).default('MEMBER'),
  birthDate             : z.string(),
  isActive              : z.boolean(),
  createdByName         : z.string(),
  createdAt             : z.string().datetime(),
  updatedAt             : z.string().datetime(),
  createdBy             : z.number(),
  updatedBy             : z.number(),
  username              : z.string(),
  englishName           : z.string().nullable(),
  address               : z.string(),
  gender                : z.enum(['MALE', 'FEMALE', 'NON_BINARY']).default('MALE'),
  maritalStatus         : z.string().nullable(),
  baptismDate           : z.string().nullable(),
  confirmationDate      : z.string().nullable(),
  profileImageUrl       : z.string().nullable(),
  emergencyContactName  : z.string().nullable(),
  emergencyContactPhone : z.string().nullable(),
  notes                 : z.string().nullable(),
  loginType             : z.string().nullable(),
  memberCode            : z.string(),
  isLoginEnabled        : z.boolean(),
  lastLoginAt           : z.string().datetime(),
  availableMissionCount : z.number(),
  availableTalentReward : z.number(),
  earnedTalentReward    : z.number(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const MemberDto = z.object({
  id        : z.number(),
  name      : z.string().min(1, '이름을 입력해주세요'),
  email     : z.string().email('올바른 이메일을 입력해주세요'),
  phone     : z.string(),
  churchId  : z.number(),
  role      : z.enum(['MEMBER', 'LEADER', 'PASTOR', 'ADMIN']).default('MEMBER'),
  status    : z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  birthDate : z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const MemberParamsDto = z.object({
  page           : z.string(),  //.refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string(),  //.refine((val) => !isNaN(Number(val))).optional().default('10'),
  name           : z.string().optional(),
  englishName    : z.string().optional(),
  phone          : z.string().optional(),
  email          : z.string().optional(),
  role           : z.enum(['MEMBER', 'LEADER', 'PASTOR', 'ADMIN']).optional(),
  isActive       : z.boolean().optional(),
  churchName     : z.string().optional(),
  searchStartDate: z.string().optional(),
  searchEndDate  : z.string().optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateMemberDto = z.object({
    username        : z.string().min(1, '사용자명을 입력해주세요'),
    password        : z.string().min(1, '비밀번호를 입력해주세요'),
    name            : z.string().min(1, '이름을 입력해주세요'),
    englishName     : z.string().min(1, '영문 이름을 입력해주세요'),
    phone           : z.string().min(1, '휴대전화를 입력해주세요'),
    email           : z.string().email('올바른 이메일을 입력해주세요'),
    address         : z.string().min(1, '주소를 입력해주세요'),
    birthDate       : z.string().date('생년월일을 입력해주세요').optional(),
    gender          : z.enum(['MALE', 'FEMALE', 'NON_BINARY']).default('MALE').optional(),
    role            : z.enum(['MEMBER', 'LEADER', 'PASTOR', 'ADMIN']).default('MEMBER').optional(),
    profileImageUrl : z.string().optional(),
    churchId        : z.number().optional(),
  })

export const UpdateMemberDto = CreateMemberDto.omit({ password: true }).extend({
  id: z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateAttendanceDto = z.object({
  memberId: z.number(),
  checkDate: z.string().date('체크일자를 입력해주세요'),
  checkMethod: z.enum(['ONLINE', 'QR_CODE']).default('ONLINE').optional(),
  location: z.string().min(1, '위치를 입력해주세요'),
  notes: z.string().optional(),
})

// ----------------------------------------------------------------------

export namespace MemberEntity {
  export type Member = z.infer<typeof MemberDto>;
  export type MemberParams = z.input<typeof MemberParamsDto>;
  export type MemberRes = z.infer<typeof MemberResDto>;
  export type CreateMember = z.input<typeof CreateMemberDto>;
  export type UpdateMember = z.input<typeof UpdateMemberDto>;
  export type CreateAttendance = z.input<typeof CreateAttendanceDto>;
}
