import type { AuthEntity } from '@workspace/http/must/auth';
import { Spacing } from '@workspace/ui/components/box';
import { CustomIcon, Text } from '@workspace/ui/components/text';

import { BackBtnHeader } from '@/shared/components/header';
import { ItemBox } from '@/shared/components/box';
import { MyInfo } from '../my-info';

// ----------------------------------------------------------------------

export const MyPageScreen = async ({ userInfo }: { userInfo: AuthEntity.UserInfo }) => {
  return (
    <>
      <BackBtnHeader />
      <main className="pt-[50px] bg-gray-50 min-h-dvh">
        <Spacing size={20} />

        <MyInfo memberId={userInfo.id} />

        <Spacing size={20} />

        <ItemBox className="mx-3">
          <MyPageListLink title="미션 진행도" iconName="Pencil" />
          <div className="px-3 py-2 flex flex-col gap-2">
            <Text size={'sm'} className="font-semibold">
              데일리미션
            </Text>
            <div className="h-3 flex rounded-full overflow-hidden bg-gray-100">
              <div className="h-full w-[20%] bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </div>
            <Text size={'sm'} className="text-gray-400">
              레벨업까지 남은 미션: 10개
            </Text>
          </div>

          <div className="px-3 py-2 flex flex-col gap-2">
            <Text size={'sm'} className="font-semibold">
              챌린지미션
            </Text>
            <div className="h-3 flex rounded-full overflow-hidden bg-gray-100">
              <div className="h-full w-[60%] bg-gradient-to-r from-yellow-400 to-pink-400"></div>
            </div>
            <Text size={'sm'} className="text-gray-400">
              레벨업까지 남은 미션: 10개
            </Text>
          </div>
        </ItemBox>

        <Spacing size={20} />

        <ItemBox className="mx-3">
          <Text size={'sm'} className="font-semibold px-3 py-2 mb-2 text-gray-700">
            나의활동
          </Text>
          <MyPageListLink title="교회 출석" iconName="Pencil" />
          <MyPageListLink title="데일리미션 참여" iconName="Pencil" />
          <MyPageListLink title="챌린지미션 참여" iconName="Pencil" />
        </ItemBox>

        <Spacing size={20} />

        <ItemBox className="mx-3">
          <Text size={'sm'} className="font-semibold px-3 py-2 mb-2 text-gray-700">
            고객지원
          </Text>
          <MyPageListLink title="공지사항" iconName="Pencil" />
          <MyPageListLink title="개인정보처리방침" iconName="Pencil" />
        </ItemBox>

        <Spacing size={20} />

        <ItemBox className="mx-3">
          <MyPageListLink title="로그아웃" iconName="Pencil" />
        </ItemBox>

        <Spacing size={20} />
      </main>
    </>
  );
};

function MyPageListLink({ title, iconName }: { title: string; iconName: string }) {
  return (
    <div className="flex-center justify-between gap-3 px-3 py-2 active:bg-gray-100 active:scale-95 transition-all duration-200 rounded-md">
      <Text className="flex-1 font-medium">{title}</Text>
      <CustomIcon name="ChevronRight" className="size-5" />
    </div>
  );
}
