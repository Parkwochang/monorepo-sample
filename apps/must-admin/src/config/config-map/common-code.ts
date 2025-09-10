export const MIDDLEWARE_MATCHER = ['/admin', '/manager'];

export const ROLE_MAP = {
  MEMBER: '회원',
  LEADER: '리더',
  PASTOR: '목사',
  ADMIN: '관리자',
};

export const MANAGER_ROLE_MAP = {
  MEMBER: '회원',
  PASTOR: '목사',
  LEADER: '리더',
};

export const MISSION_TYPE_MAP = {
  MULTI: '객관식',
  FILL: '빈칸채우기',
  WRITE: '서술형',
};

export const MISSION_KIND_TYPE_MAP = [
  { key: '데일리미션', value: 'MULTI' },
  { key: '챌린지미션', value: 'WRITE' },
];

export const MISSION_MULTI_TYPE_MAP = [
  { key: 'O/X', value: 'OX' },
  { key: '객관식', value: 'MULTI' },
];

export const DIFFICULTY_LEVEL_MAP = {
  BEGINNER: '쉬움',
  INTERMEDIATE: '보통',
  ADVANCED: '어려움',
};

export const MISSION_EXECUTION_STATUS_MAP = {
  NOT_STARTED: '미수행',
  SUBMITTED: '수행완료',
  APPROVED: '승인완료',
  REJECTED: '거절완료',
};

export const BOARD_CATEGORY_MAP = {
  CELL_GROUP: '셀그룹',
  SENIORS: '장년부/어르신',
  QNA: '질문과 답변',
  PRAYER: '기도',
  GENERAL: '일반',
  VOLUNTEER: '봉사',
  MISSION: '선교',
  CHOIR: '찬양대',
  MEN: '남성부',
  NOTICE: '공지사항',
  EVENT: '행사',
  WOMEN: '여성부',
  CHILDREN: '어린이',
  SUNDAY_SCHOOL: '주일학교',
  TESTIMONY: '간증',
  ANNOUNCEMENT: '알림/공고',
  YOUTH: '청년부',
  BIBLE_STUDY: '성경공부',
  MINISTRY: '사역',
  FELLOWSHIP: '교제',
};
