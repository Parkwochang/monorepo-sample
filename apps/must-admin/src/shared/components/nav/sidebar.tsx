import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from '@workspace/ui/components/navigator';

import { SidebarNavGroup } from './sidebar-group';
import type { NavGroupItemType } from './type';
import { LogoTitle } from './logo';

// ----------------------------------------------------------------------
// ! 사이드바 컴포넌트

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navMain: NavGroupItemType[];
  logo?: string;
}

export function AppSidebar({ logo, navMain, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <LogoTitle />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNavGroup items={navMain} />
        {/* <SidebarNavGroup items={data.navClouds} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
    </Sidebar>
  );
}
