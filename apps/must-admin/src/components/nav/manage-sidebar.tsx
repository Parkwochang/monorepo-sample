'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/navigator';
import { CustomIcon, Heading } from '@workspace/ui/components/text';

import { SidebarNavGroup } from './nav-group';
import type { NavGroupItemType, NavItemType } from './type';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: '대시보드',
      url: '/manager',
      icon: 'LayoutDashboard',
    },
    {
      title: '회원',
      url: '/manager/member',
      icon: 'UserRoundSearch',
    },
    {
      title: '교회',
      url: '/manager/church',
      icon: 'Church',
      items: [
        {
          title: '일정 관리',
          url: '/manager/church/schedule',
        },
      ],
    },
    {
      title: '미션',
      url: '/manager/mission',
      icon: 'CalendarCheck',
      items: [
        {
          title: '미션 템플릿',
          url: '/manager/mission/template',
        },
        {
          title: '미션 일정',
          url: '/manager/mission/schedule',
        },
      ],
    },
    {
      title: '기부금',
      url: '/manager/donation',
      icon: 'Mail',
    },
  ] satisfies NavGroupItemType[],
};

export function ManageAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                {/* <CustomIcon name="AlarmClock" className="!size-5" /> */}
                <Heading asType="h1" size="xl">
                  WEEPLE
                </Heading>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavGroup items={data.navMain} />
        {/* <SidebarNavGroup items={data.navClouds} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
