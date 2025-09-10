import type { IconName } from '@workspace/ui/components/text';

import { BASE_PATH, ROUTES_PATH } from './path';

// ----------------------------------------------------------------------
// ! 사이드바 라우트

export interface NavItemType {
  title: string;
  url: string;
  icon?: IconName;
  isActive?: boolean;
}

export interface NavGroupItemType {
  title: string;
  url: string;
  icon?: IconName;
  items?: NavItemType[];
}

export const ADMIN_ROUTES = {
  navMain: [
    {
      title: '대시보드',
      url: BASE_PATH.admin,
      icon: 'LayoutDashboard',
    },
    {
      title: '회원',
      url: BASE_PATH.admin + ROUTES_PATH.member,
      icon: 'UserRoundSearch',
      items: [
        {
          title: '회원 관리',
          url: BASE_PATH.admin + ROUTES_PATH.member,
        },
        {
          title: '출석 관리',
          url: BASE_PATH.admin + ROUTES_PATH.checkIn,
        },
        {
          title: '출금 신청',
          url: BASE_PATH.admin + ROUTES_PATH.withdrawal,
        },
      ],
    },
    {
      title: '교회',
      url: BASE_PATH.admin + ROUTES_PATH.church,
      icon: 'Church',
      items: [
        {
          title: '교회 관리',
          url: BASE_PATH.admin + ROUTES_PATH.church,
        },
        {
          title: '일정 관리',
          url: BASE_PATH.admin + ROUTES_PATH.churchSchedule,
        },
        {
          title: '커뮤니티 관리',
          url: BASE_PATH.admin + ROUTES_PATH.churchCommunity,
        },
      ],
    },
    {
      title: '미션',
      url: BASE_PATH.admin + ROUTES_PATH.mission,
      icon: 'CalendarCheck',
      items: [
        {
          title: '미션 템플릿',
          url: BASE_PATH.admin + ROUTES_PATH.missionTemplate,
        },
        {
          title: '미션 일정',
          url: BASE_PATH.admin + ROUTES_PATH.missionSchedule,
        },
        {
          title: '미션 수행',
          url: BASE_PATH.admin + ROUTES_PATH.excution,
        },
      ],
    },
    {
      title: '기부금',
      url: BASE_PATH.admin + ROUTES_PATH.donation,
      icon: 'Mail',
    },
  ] satisfies NavGroupItemType[],
};

export const MANAGE_ROUTES = {
  navMain: [
    {
      title: '대시보드',
      url: BASE_PATH.manage,
      icon: 'LayoutDashboard',
    },
    {
      title: '회원',
      url: BASE_PATH.manage + ROUTES_PATH.member,
      icon: 'UserRoundSearch',
    },
    {
      title: '교회',
      url: BASE_PATH.manage + ROUTES_PATH.church,
      icon: 'Church',
      items: [
        {
          title: '일정 관리',
          url: BASE_PATH.manage + ROUTES_PATH.churchSchedule,
        },
        {
          title: '커뮤니티 관리',
          url: BASE_PATH.manage + ROUTES_PATH.churchCommunity,
        },
      ],
    },
    {
      title: '미션',
      url: BASE_PATH.manage + ROUTES_PATH.mission,
      icon: 'CalendarCheck',
      items: [
        {
          title: '미션 템플릿',
          url: BASE_PATH.manage + ROUTES_PATH.missionTemplate,
        },
        {
          title: '미션 일정',
          url: BASE_PATH.manage + ROUTES_PATH.missionSchedule,
        },
      ],
    },
    {
      title: '기부금',
      url: BASE_PATH.manage + ROUTES_PATH.donation,
      icon: 'Mail',
    },
  ] satisfies NavGroupItemType[],
};
