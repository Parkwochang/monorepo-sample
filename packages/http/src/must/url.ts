export const SHARED_URL = {
  login: 'auth/login',
  oauth: 'auth/oauth/login',
  validateToken: 'auth/valid',
};

export const CHURCH_URL = {
  church: 'churches',
  churches: 'churches/page',
  churchesAll: 'churches/list',
  churchById: (id: number) => `churches/${id}`,
};

export const MEMBER_URL = {
  member: 'members',
  members: 'members/page',
  membersAll: 'members/list',
  memberById: (id: number) => `members/${id}`,
  updateChurch: `members/church`,
  attendance: `member/checks`,
};

export const DONATION_URL = {
  donation: 'churches/donations',
  donations: 'churches/donations/page', // 페이지네이션
  donationsAll: 'churches/donations/list', // 전체 목록
  donationById: (id: number) => `churches/donations/${id}`,
};

export const MISSION_URL = {
  mission: 'mission/templates',
  missions: 'mission/templates/page', // 페이지네이션
  missionsAll: 'mission/templates/list', // 전체 목록
  missionById: (id: number) => `mission/templates/${id}`,
};

export const MISSION_SCHEDULE_URL = {
  today: 'mission/schedules/today',
  schedule: 'mission/schedules',
  schedules: 'mission/schedules/page', // 페이지네이션
  schedulesAll: 'mission/schedules/list', // 전체 목록
  scheduleById: (id: number) => `mission/schedules/${id}`,
};

export const MISSION_EXECUTION_URL = {
  execution: 'members/mission-executions',
  executions: 'members/mission-executions/page', // 페이지네이션
  executionById: (id: number) => `members/mission-executions/${id}`,
  excutionApprove: 'members/mission-executions/approve',
  excutionApproveList: 'members/mission-executions/approve/list',
};

export const RANKS_URL = {
  weeklyRanksTalent: 'stats/weekly-rankings/weekly',
  weeklyRanksDonation: 'stats/weekly-rankings/weekly/donation',
  ranks: 'stats/weekly-rankings/page',
  weeklyTotalCompleted: 'stats/weekly-rankings/weekly/mission',
};

export const CHURCH_SCHEDULE_URL = {
  schedules: 'calendars/page',
  scheduleById: (id: number) => `calendars/${id}`,
  schedule: 'calendars',
};

export const CHECK_IN_URL = {
  checkIn: 'member/checks',
  checkIns: 'member/checks/page',
};

export const TALENT_URL = {
  talent: 'talents',
  talents: 'talents/page',
  talentsAll: 'talents/list',
  talentMy: 'talent/accounts/my',
  talentById: (id: number) => `talents/${id}`,
  talentDeposit: 'talent/accounts/deposit',
  talentWithdraw: 'talent/accounts/withdraw',
};

export const WITHDRAWAL_URL = {
  withdrawal: 'talent/withdrawal-requests',
  withdrawals: 'talent/withdrawal-requests/page',
  withdrawalById: (id: number) => `talent/withdrawal-requests/${id}`,
  withdrawalApprove: 'talent/withdrawal-requests/approve',
  withdrawalReject: 'talent/withdrawal-requests/reject',
};

export const BOARD_URL = {
  board: 'board',
  boards: 'board/page',
  boardById: (id: number) => `board/${id}`,
  boardComment: 'board/comments',
  boardComments: 'board/comments/page',
  boardCommentById: (id: number) => `board/comments/${id}`,
};

export const AI_CHAT_URL = {
  aiChat: 'public/ai/summarize',
  aiChats: 'ai-chat/page',
  aiChatById: (id: number) => `ai-chat/${id}`,
};
