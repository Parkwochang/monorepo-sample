import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
} from '@workspace/ui/components/navigator';

import { NavItem } from './nav-item';
import type { NavGroupItemType, NavItemType } from './type';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/box';
import { CustomIcon, Text } from '@workspace/ui/components/text';

interface NavItemProps {
  items: NavGroupItemType[];
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
            if (item.items) return <CollapsibleNavGroup key={item.title} {...item} />;

            return <NavItem key={item.title} isActive={pathname === item.url} {...item} />;
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function CollapsibleNavGroup({ title, url, icon, items }: NavGroupItemType) {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="px-0">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
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
              <NavItem {...item} />
            </SidebarMenuSub>
          ))}
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

{
  /* <SidebarMenu>
  <Collapsible defaultOpen className="group/collapsible">
    <SidebarMenuItem>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem />
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</SidebarMenu> */
}
