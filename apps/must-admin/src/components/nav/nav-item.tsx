import Link from 'next/link';

import { SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/navigator';
import { CustomIcon, Text, type IconName } from '@workspace/ui/components/text';
import type { NavItemType } from './type';

export const NavItem = ({ title, url, icon, isActive }: NavItemType) => {
  return (
    <SidebarMenuItem key={title} className="cursor-pointer">
      <SidebarMenuButton asChild>
        <Link href={url}>
          {icon && <CustomIcon name={icon} className={isActive ? 'text-blue-400' : ''} />}
          <Text className={isActive ? 'text-blue-400' : ''}>{title}</Text>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
