import Link from 'next/link';

import { SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/navigator';
import { CustomIcon, Text, type IconName } from '@workspace/ui/components/text';
import type { NavItemType } from './type';
import { cn } from '@workspace/ui/lib';

// ----------------------------------------------------------------------
// ! 사이드바 아이템 컴포넌트

const ActiveStyle = 'bg-sidebar-accent peer-hover/menu-button:text-sidebar-accent-foreground';

export const NavItem = ({ title, url, icon, isActive }: NavItemType) => {
  return (
    <SidebarMenuItem key={title} className="cursor-pointer">
      <SidebarMenuButton asChild className={cn('gap-1', isActive ? ActiveStyle : '')}>
        <Link href={url} scroll={false}>
          {icon && <CustomIcon name={icon} />}
          <Text className={isActive ? 'font-semibold text-sidebar-accent-foreground' : ''}>{title}</Text>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
