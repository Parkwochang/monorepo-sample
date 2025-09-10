import { MustInstance } from '@workspace/http/lib';
import { TALENT_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { TalentParamsDto, type TalentEntity } from './talent.dto';

// ----------------------------------------------------------------------

export const getTalents = async (params: TalentEntity.TalentParams) => {
  const searchParams = TalentParamsDto.parse(params);

  const { data } = await MustInstance.get(TALENT_URL.talents, {
    searchParams,
  }).json<PaginationList<TalentEntity.TalentResponse>>();

  return data;
};

export const getMyTalent = async () => {
  const { data } = await MustInstance.get(TALENT_URL.talentMy).json<ResJson<TalentEntity.TalentResponse>>();

  return data;
};

export const getTalentById = async (id: number) => {
  const { data } = await MustInstance.get(TALENT_URL.talentById(id)).json<ResJson<TalentEntity.TalentResponse>>();

  return data;
};

export const getTalentDeposit = async (json: TalentEntity.TalentDeposit) => {
  const { data } = await MustInstance.post(TALENT_URL.talentDeposit, {
    json,
  }).json<ResJson<TalentEntity.TalentResponse>>();

  return data;
};

export const getTalentWithdraw = async (json: TalentEntity.TalentWithdraw) => {
  const { data } = await MustInstance.post(TALENT_URL.talentWithdraw, {
    json,
  }).json<ResJson<TalentEntity.TalentResponse>>();

  return data;
};
