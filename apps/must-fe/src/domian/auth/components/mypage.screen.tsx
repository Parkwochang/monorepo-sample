import type { AuthEntity } from '@workspace/http/must/auth';
import { Spacing } from '@workspace/ui/components/box';

import { BackBtnHeader } from '@/shared/components/header';
import { MyInfo, MypageLinkBox } from './my-page';

// ----------------------------------------------------------------------

export const MyPageScreen = async ({ userInfo }: { userInfo: AuthEntity.UserInfo }) => {
  return (
    <>
      <BackBtnHeader />
      <main className="pt-[50px] bg-gray-50 min-h-dvh">
        <Spacing size={20} />

        <MyInfo memberId={userInfo.id} />

        <Spacing size={20} />

        <MypageLinkBox />

        <Spacing size={20} />
      </main>
    </>
  );
};
