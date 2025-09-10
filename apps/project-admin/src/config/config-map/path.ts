// ----------------------------------------------------------------------
// ! 라우트 경로

export const BASE_PATH = {
  admin: '/admin',
  manage: '/manage',
  signIn: '/sign-in',
  signUp: '/sign-up',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  verifyPhone: '/verify-phone',
  verifyCode: '/verify-code',
  verifyOTP: '/verify-otp',
};

export const ADMIN_PATH = {
  dashboard: BASE_PATH.admin,
  member: `${BASE_PATH.admin}/member`,
  memberCreate: `${BASE_PATH.admin}/member/create`,
  memberDetail: (id: number) => `${BASE_PATH.admin}/member/${id}`,
  church: `${BASE_PATH.admin}/church`,
  churchCreate: `${BASE_PATH.admin}/church/create`,
  churchDetail: (id: number) => `${BASE_PATH.admin}/church/${id}`,
  churchSchedule: `${BASE_PATH.admin}/church/schedule`,
  mission: `${BASE_PATH.admin}/mission`,
  missionDetail: (id: number) => `${BASE_PATH.admin}/mission/${id}`,
  missionTemplate: `${BASE_PATH.admin}/mission/template`,
  missionTemplateDetail: (id: number) => `${BASE_PATH.admin}/mission/template/${id}`,
  missionSchedule: `${BASE_PATH.admin}/mission/schedule`,
  donation: `${BASE_PATH.admin}/donation`,
};

export const ROUTES_PATH = {
  // 회원
  member: '/member',
  memberCreate: '/member/create',
  memberDetail: (id: number) => `/member/${id}`,

  // 교회
  church: '/church',
  churchCreate: '/church/create',
  churchDetail: (id: number) => `/church/${id}`,

  // 교회 일정
  churchSchedule: '/church/schedule',
  churchScheduleCreate: '/church/schedule/create',
  churchScheduleDetail: (id: number) => `/church/schedule/${id}`,

  // 교회 커뮤니티
  churchCommunity: '/church/community',
  churchCommunityCreate: '/church/community/create',
  churchCommunityDetail: (id: number) => `/church/community/${id}`,

  // 미션
  mission: '/mission',
  missionDetail: (id: number) => `/mission/${id}`,
  // 미션 템플릿
  missionTemplate: '/mission/template',
  missionTemplateCreate: '/mission/template/create',
  missionTemplateDetail: (id: number) => `/mission/template/${id}`,
  // 미션 일정
  missionSchedule: '/mission/schedule',
  missionScheduleCreate: '/mission/schedule/create',
  missionScheduleDetail: (id: number) => `/mission/schedule/${id}`,
  // 미션 수행
  excution: '/mission/excution',
  excutionCreate: '/mission/excution/create',
  excutionDetail: (id: number) => `/mission/excution/${id}`,

  // 기부
  donation: '/donation',
  donationCreate: '/donation/create',
  donationDetail: (id: number) => `/donation/${id}`,

  // 출석
  checkIn: '/member/check-in',

  // 출금
  withdrawal: '/member/withdrawal',
};
