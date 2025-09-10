'use client';

import { useQuery } from '@tanstack/react-query';

import { CHECK_IN_URL } from '@workspace/http/must/url';
import { getCheckIns } from '@workspace/http/must/check-in';

import type { CheckInEntity } from '@workspace/http/must/check-in';

// ----------------------------------------------------------------------

export const useGetCheckIns = (params: CheckInEntity.CheckInParams) => {
  return useQuery({
    queryKey: [CHECK_IN_URL.checkIns, params],
    queryFn: () => getCheckIns(params),
  });
};
