'use client';

import { BackBtnHeader } from '@/shared/components/header';
import { type MemberEntity } from '@workspace/http/must/member';
import { Spacing } from '@workspace/ui/components/box';

import { ProfileForm } from './my-page';

export const ProfileScreen = ({ userInfo }: { userInfo: MemberEntity.MemberRes }) => {
  return (
    <>
      <BackBtnHeader />
      <main className="pt-[50px] px-5 min-h-dvh relative">
        <Spacing size={20} />
        <ProfileForm myProfile={userInfo} />
        <Spacing size={20} />
      </main>
    </>
  );
};
