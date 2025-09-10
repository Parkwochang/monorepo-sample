export const SHARED_URL = {
  login: 'auth/login',
  oauth: 'auth/oauth/login',
  validateToken: 'auth/valid',
};

export const USER_URL = {
  member: 'members',
  members: 'members/page',
  membersAll: 'members/list',
  memberById: (id: number) => `members/${id}`,
  attendance: `member/checks`,
};

export const CATEGORY_URL = {
  category: 'case-categories',
  categoryById: (id: number) => `case-categories/${id}`,
  categoryDetail: 'case-category-details',
  categoryDetailById: (id: number) => `case-category-details/${id}`,
  categoryDetailList: 'case-category-details/list',
};

export const AI_CHAT_URL = {
  chat: 'case-summaries/chat',
  summarizeChat: 'case-summaries/analyze',
  createPdf: 'document/markdown-pdf',
};
