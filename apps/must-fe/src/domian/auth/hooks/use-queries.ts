'use client';

import { useQuery } from '@tanstack/react-query';

import { getMemberById } from '@workspace/http/must/member';

// ----------------------------------------------------------------------

export const useGetMemberQuery = (id: number) => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: () => getMemberById(id),
    enabled: !!id,
  });
};
