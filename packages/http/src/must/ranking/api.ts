'use client';

import { MustInstance } from '@workspace/http/lib';
import { RANKS_URL } from '@workspace/http/must/url';
import type { PaginationList } from '@workspace/http/types/app';

import { type RankingEntity, RankParamsDto, WeeklyRankParamsDto } from './dto';

// ----------------------------------------------------------------------

export const getRanks = async (params: RankingEntity.RankParams) => {
  const searchParams = RankParamsDto.parse(params);

  const { data } = await MustInstance.get(RANKS_URL.ranks, {
    searchParams,
  }).json<PaginationList<RankingEntity.WeeklyRank>>();

  return data;
};

export const getWeeklyRanksTalent = async (params: RankingEntity.WeeklyRankParams) => {
  const searchParams = WeeklyRankParamsDto.parse(params);

  const { data } = await MustInstance.get(RANKS_URL.weeklyRanksTalent, {
    searchParams,
  }).json<PaginationList<RankingEntity.WeeklyRank>>();

  return data;
};

export const getWeeklyRanksDonation = async (params: RankingEntity.WeeklyRankParams) => {
  const searchParams = WeeklyRankParamsDto.parse(params);

  const { data } = await MustInstance.get(RANKS_URL.weeklyRanksDonation, {
    searchParams,
  }).json<PaginationList<RankingEntity.WeeklyRank>>();

  return data;
};

export const getWeeklyTotalCompleted = async (params: RankingEntity.WeeklyRankParams) => {
  const searchParams = WeeklyRankParamsDto.parse(params);

  const { data } = await MustInstance.get(RANKS_URL.weeklyTotalCompleted, {
    searchParams,
  }).json<PaginationList<RankingEntity.WeeklyRank>>();

  return data;
};
