'use client';

import { useQueries, useQuery, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { getCustomer, getCustomers } from './api';
import { CUSTOMER_URL } from './url';
import { CustomerDto } from './dto';


// ----------------------------------------------------------------------
// ! 회원 목록

export const useCustomersQuery = (searchParams: Record<string, any>) => {
  return useSuspenseQuery({
    queryKey: [CUSTOMER_URL.SITUATION.base, JSON.stringify(searchParams)],
    queryFn: () => getCustomers(/* searchParams */),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useCustomerQuery = (seq: number) => {
  return useSuspenseQuery({
    queryKey: [CUSTOMER_URL.SITUATION.detail(seq)],
    queryFn: () => getCustomer(seq),
  });
};

// // ! 회원별 적립금 모달

// export const useMemPointAllListQuery = (
//   searchParams: { userSeq: number; emoneyClass?: string; emoneyType?: string; startDate?: string; endDate?: string },
//   open: boolean,
// ) => {
//   const queryFn = () => MemberAPI.getMemPointAllList(searchParams);

//   return useQuery({
//     queryKey: [END_POINT.BENNEFIT.POINT.detail, searchParams],
//     queryFn,
//     enabled: open,
//   });
// };

// // ! 회원별 메모 목록

// export const useMemMemoQuery = (seq: number, open: boolean) => {
//   const queryFn = () => MemberAPI.getMemo(seq);

//   return useQuery({
//     queryKey: [`${END_POINT.MEMBER.SITUATION.memo}/${seq}`],
//     queryFn,
//     enabled: !!(seq && open),
//   });
// };

// // ! 회원 탈퇴 목록

// export const useWithdrawMemListQuery = (searchParams: Record<string, any>) => {
//   const queryFn = () => MemberAPI.getWithdrawMemList(searchParams);

//   return useSuspenseQuery({
//     queryKey: [END_POINT.MEMBER.DELETE_MEM.base, JSON.stringify(searchParams)],
//     queryFn,
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 기관코드 생성

// export const useInstitutionCodeQuery = () => {
//   const queryFn = () => MemberAPI.createInstitutionCode();

//   return useQuery({
//     queryKey: ['institutionCode'],
//     queryFn,
//     staleTime: 0,
//   });
// };

// // ----------------------------------------------------------------------
// // ! 회원 상세 세부

// // ! 쿠폰 목록 모달

// export const useMemCouponListQuery = (
//   seq: number,
//   enabled: boolean,
//   searchParams?: { issuanceStatus?: string; couponName?: string; usedDateTimeStart?: string; usedDateTimeEnd?: string },
// ) => {
//   const queryFn = () => MemberAPI.getMemCouponList(seq, searchParams);

//   return useQuery({
//     queryKey: [END_POINT.MEMBER.SITUATION.couponPopup(seq), JSON.stringify(searchParams)],
//     queryFn,
//     enabled,
//     // initialData: () => ({
//     //   totalCoupons: 0,
//     //   activeCoupons: 0,
//     //   usedCoupons: 0,
//     //   couponIssuances: [],
//     // }),
//   });
// };

// // ! 사용가능 쿠폰 목록

// export const useMemUsingCouponListQuery = (enabled: boolean) => {
//   const queryFn = () => MemberAPI.getMemUsingCouponList();

//   return useQuery({
//     queryKey: ['coupons/find-using-coupons'],
//     queryFn,
//     enabled,
//   });
// };

// // ! 회원별 바우처 목록

// export const useMemVoucherListQuery = (accountId: string) => {
//   const queryFn = () => MemberAPI.getMemVoucherList(accountId);

//   return useQuery({
//     queryKey: [END_POINT.MEMBER.SITUATION.voucher_list(accountId)],
//     queryFn,
//   });
// };

// // ! 회원별 1:1 문의 목록

// export const useMemQaListQuery = (accountSeq: number) => {
//   const queryFn = () => MemberAPI.getMemQaList(accountSeq);

//   return useQuery({
//     queryKey: [END_POINT.MEMBER.SITUATION.one_inquiry_list(accountSeq)],
//     queryFn,
//   });
// };

// // ! 포인트/쿠폰 회원별 목록
// export const useMemPointCouponMultiQuery = ({ accountSeq }: { accountSeq: number }) => {
//   const pointFn = () =>
//     MemberAPI.getMemPointAllList({ userSeq: accountSeq }).then(data => ({
//       ...data,
//       contents: data.contents.slice(0, 3),
//     }));

//   const couponFn = () =>
//     MemberAPI.getMemCouponList(accountSeq).then(data => ({
//       ...data,
//       couponIssuances: data.couponIssuances.slice(0, 3),
//     }));

//   return useQueries({
//     queries: [
//       {
//         queryKey: [END_POINT.BENNEFIT.POINT.detail, accountSeq],
//         queryFn: pointFn,
//       },
//       {
//         queryKey: [END_POINT.MEMBER.SITUATION.couponPopup(accountSeq)],
//         queryFn: couponFn,
//       },
//     ],
//     // combine: (result,) => {
//     //   return {
//     //     pointData: result[0],
//     //     couponData: result[1],
//     //   }
//     // },
//   });
// };

// // ! 회원별 주문 목록

// export const useMemOrderListQuery = (accountSeq: number) => {
//   const queryFn = () => MemberAPI.getMemOrderList(accountSeq);

//   return useQuery({
//     queryKey: [`${END_POINT.MEMBER.SITUATION.order_list(accountSeq)}`],
//     queryFn,
//   });
// };
