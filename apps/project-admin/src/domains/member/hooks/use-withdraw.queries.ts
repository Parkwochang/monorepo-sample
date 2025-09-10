'use client';

import { useQuery } from '@tanstack/react-query';

import { WITHDRAWAL_URL } from '@workspace/http/must/url';
import { getWithdrawalById, getWithdrawals } from '@workspace/http/must/withdrawal';

import type { WithdrawalEntity } from '@workspace/http/must/withdrawal';

// ----------------------------------------------------------------------

export const useGetWithdrawals = (params: WithdrawalEntity.WithdrawalParams) => {
  return useQuery({
    queryKey: [WITHDRAWAL_URL.withdrawals, params],
    queryFn: () => getWithdrawals(params),
  });
};

export const useGetWithdrawal = (id: number) => {
  return useQuery({
    queryKey: [WITHDRAWAL_URL.withdrawalById(id)],
    queryFn: () => getWithdrawalById(id),
    enabled: !!id,
    staleTime: 0,
  });
};
