import { SidebarTrigger } from '@workspace/ui/components/navigator';

import { Separator } from '@workspace/ui/components/text';
import { getUser } from '@workspace/http/must/auth';
import { parseJWT } from '@repo/utils';

import { ThemeButton } from '../button/dark-mode';
import { CreateQrModal } from '../modal/create-qr';
import { AuthButton } from '../button';

export async function SiteHeader() {
  const userInfo = parseJWT(await getUser());

  return (
    <header className="bg-background z-30 sticky top-0 flex h-[50px] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="ml-auto flex items-center gap-2">
          {userInfo?.churchId && <CreateQrModal id={userInfo.churchId} />}
          <ThemeButton />

          <AuthButton userInfo={userInfo} />
        </div>
      </div>
    </header>
  );
}
