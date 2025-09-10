import { MustInstance } from '@workspace/http/lib';
import { WITHDRAWAL_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { WithdrawalParamsDto, type WithdrawalEntity } from './withdrawal.dto';

// ----------------------------------------------------------------------

export const getWithdrawals = async (params: WithdrawalEntity.WithdrawalParams) => {
  const searchParams = WithdrawalParamsDto.parse(params);

  const { data } = await MustInstance.get(WITHDRAWAL_URL.withdrawals, {
    searchParams,
  }).json<PaginationList<WithdrawalEntity.WithdrawalResponse>>();

  return data;
};

export const getWithdrawalById = async (id: number) => {
  const { data } = await MustInstance.get(WITHDRAWAL_URL.withdrawalById(id)).json<
    ResJson<WithdrawalEntity.WithdrawalResponse>
  >();

  return data;
};

export const cancelWithdrawal = async (id: number) => {
  const { data } = await MustInstance.delete(WITHDRAWAL_URL.withdrawalById(id)).json<ResJson<null>>();

  return data;
};

export const createWithdrawal = async (json: WithdrawalEntity.CreateWithdrawal) => {
  const { data } = await MustInstance.post(WITHDRAWAL_URL.withdrawal, {
    json,
  }).json<ResJson<null>>();

  return data;
};

export const approveWithdrawal = async (json: WithdrawalEntity.WithdrawalApprove) => {
  const { data } = await MustInstance.post(WITHDRAWAL_URL.withdrawalApprove, {
    json,
  }).json<ResJson<null>>();

  return data;
};

export const rejectWithdrawal = async (json: WithdrawalEntity.WithdrawalApprove) => {
  const { data } = await MustInstance.post(WITHDRAWAL_URL.withdrawalReject, {
    json,
  }).json<ResJson<null>>();

  return data;
};
