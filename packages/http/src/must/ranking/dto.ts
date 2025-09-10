import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore

export const WeeklyRankResDto = z.object({
  id                     : z.number(),
  memberId               : z.number(),
  memberName             : z.string(),
  churchId               : z.number(),
  churchName             : z.string(),
  rankingScope           : z.enum(['GLOBAL', 'CHURCH']),
  yearWeek               : z.string().date(),
  weekStartDate          : z.string().date(),
  weekEndDate            : z.string().date(),
  weeklyTalentsEarned    : z.number(),
  talentRankGlobal       : z.number(),
  talentRankChurch       : z.number(),
  talentRankChange       : z.number(),
  weeklyDonationAmount   : z.number(),
  donationRankGlobal     : z.number(),
  donationRankChurch     : z.number(),
  donationRankChange     : z.number(),
  weeklyMissionsCompleted: z.number(),
  missionRankGlobal      : z.number(),
  missionRankChurch      : z.number(),
  missionRankChange      : z.number(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const RankParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))).optional().default('10'),
  searchStartDate: z.string().date().optional(),
  searchEndDate  : z.string().date().optional(),
});

export const WeeklyRankParamsDto = z.object({
  churchId: z.number().optional(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export namespace RankingEntity {
  export type RankParams       = z.input<typeof RankParamsDto>;
  export type WeeklyRankParams = z.input<typeof WeeklyRankParamsDto>;
  export type WeeklyRank       = z.infer<typeof WeeklyRankResDto>;
}
