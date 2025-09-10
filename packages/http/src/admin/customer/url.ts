export const CUSTOMER_URL = {
  SITUATION: {
    base: 'users' /* 목록, 등록, 수정, 삭제 */,
    delete_member: 'users/withdrawal',
    detail: (seq: number) => `users/${seq}`,
    memo: 'user-memos',
    all_approve: 'users/update-info-user-approval',
    partnership_app: 'users/update-partnership-group-approval',
    partnership_rej: (seq: number) => `users/update-partnership-group-reject/${seq}`,
    membership_app: 'users/update-event-group-approval',
    membership_rej: (seq: number) => `users/update-event-group-reject/${seq}`,
    duplicate_id: 'users/validate/account-id',
    duplicate_nickname: 'users/validate/nickname',
    couponPopup: (seq: number) => `coupon-issuances/popup/find-coupon-issuance-by-user/${seq}`,
    order_list: (seq: number) => `users/${seq}/order-summary`,
    upload_excel: 'users/excel-upload',
    download_excel: 'users/excel-download',
    voucher_list: (accountId: string) =>
      `vouchers?pageSize=3&pageNumber=1&searchCondition=accountId&searchKeyword=${accountId}`,
    one_inquiry_list: (accountSeq: number) =>
      `board-dedicated-inquiry?pageSize=3&pageNumber=1&inquiryType=CUSTOMER&registAccountSeq=${accountSeq}`,
    reset_pw: `users/reset-pwd-new`,
  },
  GROUP: {
    base: 'user-groups',
    delete: (seq: number) => `user-groups/${seq}`,
    create_code: 'user-groups/institution-code',
  },
  MEMBERSHIP: {
    base: 'user-memberships',
    update: (seq: number) => `user-memberships/${seq}`,
  },
  DELETE_MEM: { base: 'user-withdrawals', delete: 'user-withdrawals/delete' },
  STATISTICS: {
    join_base: 'statistics/user/join',
    withdrawal_base: 'statistics/user/withdrawal',
  },
};