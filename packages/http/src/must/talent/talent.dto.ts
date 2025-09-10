import { z } from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore

export const TalentResDto = z.object({
  id: z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const TalentParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))).optional().default('10'),
  searchStartDate: z.string().date().optional(),
  searchEndDate  : z.string().date().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const TalentDepositDto = z.object({
  memberId       : z.number(),
  transactionType: z.enum(['EARN', 'SPEND', 'TRANSFER']).default('EARN'),
  category       : z.enum(['MISSION', 'ATTENDANCE', 'DONATION', 'PURCHASE']),
  amount         : z.number(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const TalentWithdrawDto = z.object({
  memberId       : z.number(),
  transactionType: z.enum(['EARN', 'SPEND', 'TRANSFER']).default('SPEND'),
  category       : z.enum(['MISSION', 'ATTENDANCE', 'DONATION', 'PURCHASE']),
  amount         : z.number(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export namespace TalentEntity {
  export type TalentResponse = z.infer<typeof TalentResDto>;
  export type TalentParams   = z.input<typeof TalentParamsDto>;
  export type TalentDeposit  = z.input<typeof TalentDepositDto>;
  export type TalentWithdraw = z.input<typeof TalentWithdrawDto>;
}
