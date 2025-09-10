'use client';

import { useQuery } from '@tanstack/react-query';

import { getMemberById } from '@workspace/http/must/member';
import { MEMBER_URL } from '@workspace/http/must/url';

// ----------------------------------------------------------------------

export const useGetMemberQuery = (id: number) => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: () => getMemberById(id),
    enabled: !!id,
  });
};
