'use client';

import { useMutation } from '@tanstack/react-query';

// import { CUSTOMER_MESSAGE } from '@/_constants/message';
// import { revalidateCache } from '@/_server/helper';
import { createCustomer, deleteCustomer, updateCustomer } from './api';
import type { CustomerEntity } from './dto';
import { CUSTOMER_URL } from './url';

// ----------------------------------------------------------------------
// ! 회원

export const useCreateCustomerMutation = () => {
  const mutationFn = (body: CustomerEntity.CreateCustomer) => createCustomer(body);

  return useMutation({
    mutationFn,
    // onSuccess: ({ isValid, message }) => {
    //   toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.register(isValid, message));
    //   return isValid && push(ROOTS.ADMIN + PATH.MEMBER.root, { scroll: false });
    // },
  });
};

export const useUpdateCustomerMutation = () => {
  const mutationFn = (body: CustomerEntity.UpdateCustomer) => updateCustomer(body);

  return useMutation({
    mutationFn,
  });
};

export const useDeleteCustomerMutation = () => {
  const mutationFn = (body: CustomerEntity.DelCustomer) => deleteCustomer(body);

  return useMutation({
    mutationFn,
    meta: {
      invalidateQueries: [CUSTOMER_URL.SITUATION.base],
    }
  })
}

// // ----------------------------------------------------------------------
// // ! 회원 상세 / 수정

// export const useUpdateMemMutation = () => {
//   const router = useRouter();
//   const mutationFn = (body: { user: { accountSeq: number } & UserMemberBody; userCompany?: CompanyMemberBody }) =>
//     MemberAPI.updateMember(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       if (isValid) {
//         revalidateCache({ key: END_POINT.MEMBER.SITUATION.base });
//         router.push(ROOTS.ADMIN + PATH.MEMBER.root, { scroll: false });
//       }

//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.update(isValid, message));
//     },
//   });
// };

// export const useDeleteMemMutation = () => {
//   const { push } = useRouter();
//   const mutationFn = (body: { accountSeq: number; withdrawalReason: string }) => MemberAPI.deleteMember(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.delete(isValid, message));

//       push(ROOTS.ADMIN + PATH.MEMBER.root, { scroll: false });
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 영구 삭제

// export const useDeleteMemPermanentlyMutation = () => {
//   const queryClient = useQueryClient();
//   const mutationFn = (body: { accountSeq: number[] }) => MemberAPI.deleteMemberPermanently(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       queryClient.removeQueries({ queryKey: [END_POINT.MEMBER.DELETE_MEM.base] });

//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.WITHDRAW.delete_account(isValid, message));
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 엑셀 등록

// export const useCreateExcelMemMutation = () => {
//   const mutationFn = (body: MemberSchemaType[]) => MemberAPI.createExcelMember(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: async ({ isValid, data }) => {
//       toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.EXCEL.upload(isValid));

//       return { isValid, data };
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 그룹

// export const useCreateGroupMutation = () => {
//   const mutationFn = (body: {
//     userGroup: Omit<ShareDTO['group'], 'groupSeq' | 'groupId' | 'isActivated' | 'isDeleted'>;
//   }) => MemberAPI.createGroup(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.GROUP.create_group(isValid, message));
//     },
//   });
// };

// export const useUpdateGroupMutation = () => {
//   const mutationFn = (body: { userGroup: ShareDTO['group'] }) => MemberAPI.updateGroup(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: isValid => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.GROUP.update_group(isValid));
//     },
//   });
// };

// export const useDeleteGroupMutation = () => {
//   const mutationFn = (groupSeq: number) => MemberAPI.deleteGroup(groupSeq);

//   return useMutation({
//     mutationFn,
//     onSuccess: isValid => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.GROUP.delete_group(isValid));
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 멤버십

// export const useCreateMembershipMutation = () => {
//   const mutationFn = (body: MemberDTO['membership']['create']) => MemberAPI.createMembership(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: isValid => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.MEMBERSHIP.create_membership(isValid));
//     },
//   });
// };

// export const useUpdateMembershipMutation = () => {
//   const mutationFn = (body: ShareDTO['membership'][]) =>
//     Promise.all(body.map(row => MemberAPI.updateMembership({ userMembership: row })));

//   return useMutation({
//     mutationFn,
//     onSuccess: async data => {
//       const isValid = data.every(item => item);
//       isValid && (await revalidateCache({ key: END_POINT.MEMBER.MEMBERSHIP.base }));

//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.MEMBERSHIP.update_membership(isValid));
//     },
//   });
// };

// export const useUpdateDefaultMembershipMutation = () => {
//   const mutationFn = (seq: number) => MemberAPI.updateDefaultMembership(seq);

//   return useMutation({
//     mutationFn,
//     onSuccess: isValid => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.MEMBERSHIP.update_default(isValid));
//     },
//   });
// };

// export const useDeleteMembershipMutation = () => {
//   const mutationFn = (membershipSeq: number) => MemberAPI.deleteMembership(membershipSeq);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.MEMBERSHIP.delete_membership(isValid, message));
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 승인 / 거절 / 전체 승인

// export const useMemAllAppovalMutation = () => {
//   const mutationFn = (json: { ids: number[] }) => MemberAPI.approvalAllGroup(json);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.LIST.approve(isValid, message));
//     },
//   });
// };

// export const useMemAppovalMutation = () => {
//   const mutationFn = ({
//     accountSeq,
//     institutionCode,
//     type,
//   }: {
//     accountSeq: number;
//     institutionCode: string;
//     type: 'EVENT' | 'PARTNERSHIP';
//   }) => MemberAPI.approvalGroup({ accountSeq, institutionCode }, type);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.LIST.approve(isValid, message));
//     },
//   });
// };

// export const useMemRejectMutation = () => {
//   const mutationFn = (body: { seq: number; type: 'EVENT' | 'PARTNERSHIP' }) =>
//     MemberAPI.rejectGroup(body.seq, body.type);

//   return useMutation({
//     mutationFn,
//     onSuccess: async ({ isValid, message }) => {
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.LIST.reject(isValid, message));
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 메모

// export const useCreateMemMemoMutation = () => {
//   const queryClient = useQueryClient();
//   const mutationFn = (body: { userMemo: Pick<MemberDTO['memo'], 'accountSeq' | 'memo'> }) => MemberAPI.createMemo(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: async (isValid, variables) => {
//       isValid &&
//         queryClient.invalidateQueries({
//           queryKey: [`${END_POINT.MEMBER.SITUATION.memo}/${variables.userMemo.accountSeq}`],
//         });
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.LIST.create_memo(isValid));
//     },
//   });
// };

// export const useDeleteMemMemoMutation = (accountSeq: number) => {
//   const queryClient = useQueryClient();
//   const mutationFn = (memoSeq: number) => MemberAPI.deleteMemo(memoSeq);

//   return useMutation({
//     mutationFn,
//     onSuccess: async (isValid, variables) => {
//       isValid && queryClient.invalidateQueries({ queryKey: [`${END_POINT.MEMBER.SITUATION.memo}/${accountSeq}`] });
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.LIST.delete_memo(isValid));
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 포인트

// export const useUpdateMemPointMutation = () => {
//   const queryClient = useQueryClient();

//   const mutationFn = (body: {
//     emoneyClass: string;
//     emoneyAmount: number;
//     emoneyContent: string;
//     expirationDate: string;
//     users: number[];
//   }) => MemberAPI.updateMemPoint(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: async ({ isValid, message }, variables) => {
//       isValid && queryClient.invalidateQueries({ queryKey: [END_POINT.BENNEFIT.POINT.detail, variables.users[0]!] });
//       return toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.update_point(isValid, message));
//     },
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 쿠폰

// export const useUpdateMemCouponMutation = () => {
//   const queryClient = useQueryClient();

//   const mutationFn = (body: { couponSeq: number; accountSeq: number[]; quantity: number }) =>
//     MemberAPI.updateMemCoupon(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }, variables) => {
//       if (isValid) {
//         queryClient.invalidateQueries({ queryKey: [END_POINT.MEMBER.SITUATION.couponPopup(variables.accountSeq[0]!)] });
//         queryClient.invalidateQueries({ queryKey: [END_POINT.BENNEFIT.POINT.detail] });
//       }
//       toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.create_coupon(isValid, message));

//       return isValid;
//     },
//   });
// };
// // ! 비밀번호 초기화
// export const useResetMemPasswordMutation = () => {
//   const mutationFn = (body: { accountSeq: number; accountPassword: string }) => MemberAPI.resetMemPassword(body);

//   return useMutation({
//     mutationFn,
//     onSuccess: ({ isValid, message }) =>
//       toast[isValid ? 'success' : 'error'](CUSTOMER_MESSAGE.REGISTER.reset_pw(isValid, message)),
//   });
// };
