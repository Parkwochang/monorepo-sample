'use client';

import { MustInstance } from '@workspace/http/lib';
import { CHECK_IN_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { CheckInParamsDto, type CheckInEntity } from './dto';

// ----------------------------------------------------------------------

export const getCheckIns = async (params: CheckInEntity.CheckInParams) => {
  const searchParams = CheckInParamsDto.parse(params);

  const { data } = await MustInstance.get(CHECK_IN_URL.checkIns, {
    searchParams,
  }).json<PaginationList<CheckInEntity.CheckInRes>>();

  return data;
};

export const createCheckIn = async (data: CheckInEntity.CreateCheckIn) => {
  const res = await MustInstance.post(CHECK_IN_URL.checkIn, {
    json: data,
  }).json<ResJson<null>>();

  return res;
};
