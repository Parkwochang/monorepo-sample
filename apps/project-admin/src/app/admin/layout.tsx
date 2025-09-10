import { SidebarInset } from '@workspace/ui/components/navigator';

import { ADMIN_ROUTES } from '@/config/config-map';
import { validateUserPermissions } from '@/server';
import { AppSidebar, SiteHeader } from '@/shared/components/nav';
import { MyInfoLayout } from '@/shared/components/layout';

// ----------------------------------------------------------------------

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const userInfo = await validateUserPermissions('ADMIN');

  return (
    <MyInfoLayout userInfo={userInfo}>
      <AppSidebar navMain={ADMIN_ROUTES.navMain} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 px-0 py-4 md:p-6 lg:p-8">
          {children}
          {/* <div className="w-full h-full bg-background rounded-lg">
          </div> */}
        </div>
      </SidebarInset>
    </MyInfoLayout>
  );
}
// flex flex-1 flex-col gap-4 lg:gap-6 py-4 lg:py-6
