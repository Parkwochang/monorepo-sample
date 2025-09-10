'use client';

import { useMutation } from '@tanstack/react-query';

import { createCheckIn } from './api';
import type { CheckInEntity } from './dto';
import { CHECK_IN_URL } from '../url';

// ----------------------------------------------------------------------

export const useCreateCheckIn = () => {
  return useMutation({
    mutationFn: (data: CheckInEntity.CreateCheckIn) => createCheckIn(data),
  });
};

// export const useUpdateMember = (id: number) => {
//   return useMutation({
//     mutationFn: (data: Partial<MemberEntity.CreateMember>) => updateMember(id, data),
//     meta: {
//       successMessage: '회원 정보가 성공적으로 업데이트되었습니다.',
//       errorMessage: '회원 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
//       invalidateQueries: (id: number) => [MEMBER_URL.memberById(id)],
//     },
//   });
// };

// export const useDeleteMember = () => {
//   return useMutation({
//     mutationFn: (id: number) => deleteMember(id),
//     meta: {
//       successMessage: '회원이 성공적으로 삭제되었습니다.',
//       errorMessage: '회원 삭제에 실패했습니다. 다시 시도해주세요.',
//       invalidateQueries: [MEMBER_URL.members],
//     },
//   });
// };

// export const useUpdateMemberChurch = () => {
//   return useMutation({
//     mutationFn: (json: { id: number; churchId: number }) => updateMemberChurch(json),
//     meta: {
//       successMessage: '회원 교회 정보가 성공적으로 업데이트되었습니다.',
//       errorMessage: '회원 교회 정보 업데이트에 실패했습니다. 다시 시도해주세요.',
//       invalidateQueries: (json: { id: number; churchId: number }) => [MEMBER_URL.memberById(json.id)],
//     },
//   });
// };
