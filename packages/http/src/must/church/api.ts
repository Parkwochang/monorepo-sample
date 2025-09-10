import { MustInstance } from '@workspace/http/lib';
import { CHURCH_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { ChurchParamDto, type ChurchEntity } from './dto';

// ----------------------------------------------------------------------
// ! 교회

export async function getChurchList(params: ChurchEntity.ChurchParam) {
  const searchParams = ChurchParamDto.parse(params);

  const { data } = await MustInstance.get(CHURCH_URL.churches, {
    searchParams,
  }).json<PaginationList<ChurchEntity.Church>>();

  return data;
}

export async function getChurchAllList() {
  const { data } = await MustInstance.get(CHURCH_URL.churchesAll).json<ResJson<ChurchEntity.Church[]>>();

  return data;
}

export async function getChurchById(seq: number) {
  const { data } = await MustInstance.get(CHURCH_URL.churchById(seq)).json<ResJson<ChurchEntity.Church>>();

  return data;
  // return ChurchDto.parseAsync(data);
}

export async function createChurch(json: ChurchEntity.CreateChurch) {
  const { message } = await MustInstance.post(CHURCH_URL.church, {
    json,
  })
    .json<ResJson<null>>()
    .catch((error) => error);

  return message;
}

export async function updateChurch(json: ChurchEntity.UpdateChurch) {
  const { message } = await MustInstance.patch(CHURCH_URL.church, {
    json,
  })
    .json<ResJson<null>>()
    .catch((error) => error);

  return message;
}

export async function deleteChurch(id: number) {
  const { message } = await MustInstance.delete(CHURCH_URL.churchById(id))
    .json<ResJson<null>>()
    .catch((error) => error);

  return message;
}
