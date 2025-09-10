import z from 'zod';

// import { OptionalSchema } from "../common/dto";

// ----------------------------------------------------------------------
// prettier-ignore
const ChurchResDto = z.object({
  id                          : z.number(),
  createdAt                   : z.string().datetime(),
  updatedAt                   : z.string().datetime(),
  isActive                    : z.boolean(),
  churchName                  : z.string(),
  phone                       : z.string(),
  address                     : z.string(),
  pastorName                  : z.string().optional(),
  email                       : z.string().email().optional(),
  website                     : z.string().url().optional(),
  establishedDate             : z.string().date(),
  latitude                    : z.string().or(z.number()).transform((val) => (val.toString())),
  longitude                   : z.string().or(z.number()).transform((val) => (val.toString())),
  profileImageUrl             : z.string().url().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore
const ChurchParamDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))), //.transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))), //.transform((val) => Number(val)).optional().default('10'),
  pastorName     : z.string().optional(),
  churchName     : z.string().optional(),
  searchStartDate: z.string().optional(),
  searchEndDate  : z.string().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore
const CreateChurchDto = z.object({
    churchName     : z.string(),
    pastorName     : z.string().optional(),
    address        : z.string().min(1, '주소를 입력해주세요.'),
    phone          : z.string().regex(/^\d{2,4}-\d{3,4}-\d{4}$/, '유효한 전화번호를 입력해주세요.'),
    email          : z.string().email('이메일을 입력해주세요.').optional(),
    website        : z.string().url('웹사이트를 입력해주세요.').optional(),
    establishedDate: z.string().date('설립일은 YYYY-MM-DD 형식이어야 합니다.'),
    latitude       : z.string().optional(),
    longitude      : z.string().optional(),
    profileImageUrl: z.string().optional(),
  })
// .regex(/^-?\d{1,3}\.\d{13}$/, '위도는 -90.000000에서 90.000000 사이의 값이어야 합니다.')
// regex(/^-?\d{1,3}\.\d{12}$/, '경도는 -180.000000에서 180.000000 사이의 값이어야 합니다.').

// ----------------------------------------------------------------------

const UpdateChurchDto = CreateChurchDto.extend({
  id: z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore
export namespace ChurchEntity {
  export type Church           = z.infer<typeof ChurchResDto>;
  export type ChurchParam      = z.input<typeof ChurchParamDto>;
  export type CreateChurch     = z.infer<typeof CreateChurchDto>;
  export type UpdateChurch     = z.infer<typeof UpdateChurchDto>;
}

export { ChurchResDto, ChurchParamDto, CreateChurchDto, UpdateChurchDto };
