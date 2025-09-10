'use client';

import { MustInstance } from '@workspace/http/lib';
import { MEMBER_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { MemberParamsDto, type MemberEntity } from './dto';

// ----------------------------------------------------------------------

export const getMembers = async (params: MemberEntity.MemberParams) => {
  const searchParams = MemberParamsDto.parse(params);

  const { data } = await MustInstance.get(MEMBER_URL.members, {
    searchParams,
  }).json<PaginationList<MemberEntity.MemberRes>>();

  return data;
};

export const getMemberAllList = async () => {
  const { data } = await MustInstance.get(MEMBER_URL.membersAll).json<ResJson<MemberEntity.Member[]>>();

  return data;
};

export const getMemberById = async (id: number) => {
  const { data } = await MustInstance.get(MEMBER_URL.memberById(id)).json<ResJson<MemberEntity.MemberRes>>();

  return data;
};

export const createMember = async (data: MemberEntity.CreateMember) => {
  const res = await MustInstance.post(MEMBER_URL.member, {
    json: data,
  }).json<ResJson<MemberEntity.Member>>();

  return res;
};

export const updateMember = async (data: MemberEntity.UpdateMember) => {
  const res = await MustInstance.patch(MEMBER_URL.member, {
    json: data,
  }).json<ResJson<MemberEntity.Member>>();

  return res;
};

export const deleteMember = async (id: number) => {
  const res = await MustInstance.delete(MEMBER_URL.memberById(id)).json<ResJson<void>>();

  return res;
};

export const updateMemberChurch = async (json: { id: number; churchId: number }) => {
  const res = await MustInstance.patch(MEMBER_URL.updateChurch, {
    json,
  }).json<ResJson<void>>();

  return res;
};

export const createAttendance = async (json: MemberEntity.CreateAttendance) => {
  const res = await MustInstance.post(MEMBER_URL.attendance, {
    json,
  }).json<ResJson<void>>();

  return res;
};
