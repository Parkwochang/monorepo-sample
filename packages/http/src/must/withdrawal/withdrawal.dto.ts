import { z } from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore

export const WithdrawalResDto = z.object({
  id          : z.number(),
  memberId    : z.number(),
  memberName  : z.string(),
  amount      : z.number(),
  status      : z.string(),
  statusName  : z.string(),
  requestDate : z.string(),
  approvalDate: z.string(),
  approverName: z.string(),
  notes       : z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const WithdrawalParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))), //.transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))), //.optional().default('10'),
  searchStartDate: z.string().date().optional(),
  searchEndDate  : z.string().date().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateWithdrawalDto = z.object({
  memberId       : z.number(),
  amount         : z.number(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const WithdrawalApproveDto = z.object({
  id: z.number(),
  notes: z.string().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export namespace WithdrawalEntity {
  export type WithdrawalResponse = z.infer<typeof WithdrawalResDto>;
  export type WithdrawalParams   = z.input<typeof WithdrawalParamsDto>;
  export type CreateWithdrawal   = z.input<typeof CreateWithdrawalDto>;
  export type WithdrawalApprove  = z.input<typeof WithdrawalApproveDto>;
}
