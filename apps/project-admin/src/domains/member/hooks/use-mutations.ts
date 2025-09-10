'use client';

import { useMutation } from '@tanstack/react-query';

import { MEMBER_URL, WITHDRAWAL_URL } from '@workspace/http/must/url';
import { createMember, deleteMember, updateMember, updateMemberChurch } from '@workspace/http/must/member';
import { approveWithdrawal, cancelWithdrawal, rejectWithdrawal } from '@workspace/http/must/withdrawal';
import type { MemberEntity } from '@workspace/http/must/member';
import type { WithdrawalEntity } from '@workspace/http/must/withdrawal';

// ----------------------------------------------------------------------

export const useCreateMember = () => {
  return useMutation({
    mutationFn: (data: MemberEntity.CreateMember) => createMember(data),
    meta: {
      successMessage: '회원이 성공적으로 생성되었습니다.',
      errorMessage: '회원 생성에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MEMBER_URL.members],
    },
  });
};

export const useUpdateMember = () => {
  return useMutation({
    mutationFn: (data: MemberEntity.UpdateMember) => updateMember(data),
    meta: {
      successMessage: '회원 정보가 성공적으로 업데이트되었습니다.',
      errorMessage: '회원 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MEMBER_URL.members],
    },
  });
};

export const useDeleteMember = () => {
  return useMutation({
    mutationFn: (id: number) => deleteMember(id),
    meta: {
      successMessage: '회원이 성공적으로 삭제되었습니다.',
      errorMessage: '회원 삭제에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [MEMBER_URL.members],
    },
  });
};

export const useUpdateMemberChurch = () => {
  return useMutation({
    mutationFn: (json: { id: number; churchId: number }) => updateMemberChurch(json),
    meta: {
      successMessage: '회원 교회 정보가 성공적으로 업데이트되었습니다.',
      errorMessage: '회원 교회 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: (json: { id: number; churchId: number }) => [MEMBER_URL.memberById(json.id)],
    },
  });
};

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// ! 출금 요청

export const useApproveWithdrawal = () => {
  return useMutation({
    mutationFn: (json: WithdrawalEntity.WithdrawalApprove) => approveWithdrawal(json),
    meta: {
      successMessage: '출금 요청이 승인되었습니다.',
      errorMessage: '출금 요청 승인에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [WITHDRAWAL_URL.withdrawals],
    },
  });
};

export const useRejectWithdrawal = () => {
  return useMutation({
    mutationFn: (json: WithdrawalEntity.WithdrawalApprove) => rejectWithdrawal(json),
    meta: {
      successMessage: '출금 요청이 거절되었습니다.',
      errorMessage: '출금 요청 거절에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [WITHDRAWAL_URL.withdrawals],
    },
  });
};

export const useCancleWithdrawal = () => {
  return useMutation({
    mutationFn: (id: number) => cancelWithdrawal(id),
    meta: {
      successMessage: '출금 요청이 삭제되었습니다.',
      errorMessage: '출금 요청 삭제에 실패했습니다. 다시 시도해주세요.',
      invalidateQueries: [WITHDRAWAL_URL.withdrawals],
    },
  });
};
