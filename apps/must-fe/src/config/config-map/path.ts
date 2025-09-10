export const PATH = {
  home: '/',
  mission: {
    root: '/mission',
    daily: '/mission/daily',
  },
  my: {
    root: '/my',
    profile: '/my/profile',
    mission: '/my/mission',
    donation: '/my/donation',
    withdrawal: '/my/withdrawal',
    checkIn: '/my/check-in',
    myPage: '/my/my-page',
  },
  sunday: {
    root: '/sunday',
    community: '/sunday/community',
    communityCreate: '/sunday/community/create',
    communityDetail: (id: number) => `/sunday/community/${id}`,
    schedule: '/sunday/schedule',
    scheduleDetail: (id: number) => `/sunday/schedule/${id}`,
    chat: '/sunday/chat',
  },
};
