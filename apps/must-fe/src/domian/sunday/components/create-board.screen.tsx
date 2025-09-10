import { Spacing } from '@workspace/ui/components/box';
import { Heading } from '@workspace/ui/components/text';
import { type AuthEntity } from '@workspace/http/must/auth';

import { CreateCommunityForm } from './community';

export const CreateBoardScreen = ({ userInfo }: { userInfo: AuthEntity.UserInfo }) => {
  return (
    <main className="h-dvh pt-[50px] pb-[20px] px-5">
      <Spacing size={20} />
      <Heading asType="h2" size={'lg'}>
        게시글 등록
      </Heading>
      <Spacing size={20} />
      <CreateCommunityForm churchId={userInfo.churchId} />
      <Spacing size={20} />
    </main>
  );
};
