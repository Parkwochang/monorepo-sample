import { redirect } from 'next/navigation';

import { MainScreen } from '@/domian/main/components';
import { MyInfoLayout } from '@/shared/components/layout/my-info.layout';
import { PermissionModal } from '@/shared/components/modal';
import { getParsedUserJwt } from '@/shared/service';
import { getTodayBible } from '@/lib/helpers';

// ----------------------------------------------------------------------

export default async function Home() {
  const [bible, userInfo] = await Promise.all([getTodayBible(), getParsedUserJwt()]);

  if (!userInfo) {
    redirect('/sign-in');
  }

  return (
    <MyInfoLayout userInfo={userInfo}>
      <MainScreen bible={bible} />
      <PermissionModal churchId={userInfo.churchId} />
    </MyInfoLayout>
  );
}
