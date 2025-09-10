import type { AuthEntity } from '@workspace/http/must/auth';

export const USER_ROLE = ['ADMIN', 'LEADER', 'PASTOR', 'MEMBER'] satisfies AuthEntity.UserInfo['role'][];

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
