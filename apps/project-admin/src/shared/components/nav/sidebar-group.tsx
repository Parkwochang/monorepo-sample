'use client';

import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@workspace/ui/components/navigator';

import { NavItem } from './sidebar-item';
import type { NavGroupItemType, NavItemType } from './type';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/box';
import { CustomIcon, Text } from '@workspace/ui/components/text';

// ----------------------------------------------------------------------
// ! 사이드바 그룹 컴포넌트

interface NavItemProps {
  items: NavGroupItemType[];
}

function isActive(pathname: string, url: string) {
  return pathname === url;
}

export function SidebarNavGroup({ items }: NavItemProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <CustomIcon name="Plus" />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button size="icon" className="size-8 group-data-[collapsible=icon]:opacity-0" variant="outline">
              <CustomIcon name="Mail" />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu> */}
        <SidebarMenu>
          {items.map((item) => {
            if (item.items) return <CollapsibleNavGroup key={item.title} pathname={pathname} {...item} />;

            return <NavItem key={item.title} isActive={isActive(pathname, item.url)} {...item} />;
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function CollapsibleNavGroup({ title, url, icon, items, pathname }: NavGroupItemType & { pathname: string }) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="px-0">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="gap-1">
            {icon && <CustomIcon name={icon} />}
            <Text>{title}</Text>
            <CustomIcon
              name="ChevronDown"
              className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
            />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="px-0">
          {items?.map((item) => (
            <SidebarMenuSub key={item.title}>
              <NavItem isActive={isActive(pathname, item.url)} {...item} />
            </SidebarMenuSub>
          ))}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}
