import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore
const CheckInResDto = z.object({
  id            : z.number(),
  memberName    : z.string(),
  checkDate     : z.string().date(),
  checkMethod   : z.enum(['ONLINE', 'QR_CODE']).default('ONLINE'),
  location      : z.string(),
  notes         : z.string(),
  createdAt     : z.string().datetime(),
  updatedAt     : z.string().datetime(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const CheckInParamsDto = z.object({
  pageNumber: z.number().optional().default(1),
  pageSize: z.number().optional().default(10),
  memberId: z.number().optional(),
  searchStartDate: z.string().date().optional(),
  searchEndDate: z.string().date().optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateCheckInDto = z.object({
  memberId: z.number(),
  checkDate: z.string().date(),
  checkMethod: z.enum(['ONLINE', 'QR_CODE']).default('ONLINE').optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

// ----------------------------------------------------------------------

export namespace CheckInEntity {
  export type CheckIn = z.infer<typeof CheckInResDto>;
  export type CheckInParams = z.input<typeof CheckInParamsDto>;
  export type CheckInRes = z.infer<typeof CheckInResDto>;
  export type CreateCheckIn = z.input<typeof CreateCheckInDto>;
}
