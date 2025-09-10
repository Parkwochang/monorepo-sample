import { SidebarInset } from '@workspace/ui/components/navigator';

import { ManageAppSidebar } from '@/components/nav/manage-sidebar';
import { SiteHeader } from '@/components/nav/nav-header';
import { MyInfoLayout } from '@/shared/components/layout';
import { validateUserPermissions } from '@/server';

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  const userInfo = await validateUserPermissions('LEADER');

  return (
    <MyInfoLayout userInfo={userInfo}>
      <ManageAppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8">
          {children}
          {/* <div className="w-full h-full bg-background rounded-lg">
          </div> */}
        </div>
      </SidebarInset>
    </MyInfoLayout>
  );
}
// flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6
