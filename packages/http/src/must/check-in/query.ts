'use client';

import { useQuery } from '@tanstack/react-query';

import { getCheckIns } from './api';
import type { CheckInEntity } from './dto';
import { CHECK_IN_URL } from '../url';

// ----------------------------------------------------------------------

export const useGetCheckIns = (params: CheckInEntity.CheckInParams) => {
  return useQuery({
    queryKey: [CHECK_IN_URL.checkIns, params],
    queryFn: () => getCheckIns(params),
  });
};

// export const useCheckIn = (id: number) => {
//   return useQuery({
//     queryKey: [CHECK_IN_URL.checkInById(id)],
//     queryFn: () => getMemberById(id),
//   });
// };
