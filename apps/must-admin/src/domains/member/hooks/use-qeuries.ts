'use client';

import { useQuery } from '@tanstack/react-query';

import { MEMBER_URL } from '@workspace/http/must/url';
import { getMemberAllList, getMemberById, getMembers } from '@workspace/http/must/member';
import type { MemberEntity } from '@workspace/http/must/member';

// ----------------------------------------------------------------------

export const useGetMembers = (params: MemberEntity.MemberParams) => {
  return useQuery({
    queryKey: [MEMBER_URL.members, params],
    queryFn: () => getMembers(params),
  });
};

export const useMemberAllList = () => {
  return useQuery({
    queryKey: [MEMBER_URL.membersAll],
    queryFn: () => getMemberAllList(),
  });
};

export const useGetMember = (id: number) => {
  return useQuery({
    queryKey: [MEMBER_URL.memberById(id)],
    queryFn: () => getMemberById(id),
    enabled: !!id,
    staleTime: 0,
  });
};
