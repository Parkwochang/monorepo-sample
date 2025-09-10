'use client';

import Image from 'next/image';

import { Spacing } from '@workspace/ui/components/box';
import { CustomIcon, Text } from '@workspace/ui/components/text';

import { useGetMemberQuery } from '../hooks';

// ----------------------------------------------------------------------

export const MyInfo = ({ memberId }: { memberId: number }) => {
  const { data: member } = useGetMemberQuery(memberId);

  return (
    <>
      <div className="flex-center justify-between gap-3 px-3 py-3 bg-white rounded-lg mx-3 shadow-xs">
        <div className="size-12 rounded-full overflow-hidden">
          <Image src={member?.profileImageUrl ?? '/images/profile_1.png'} alt="profile" width={48} height={48} />
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <Text size={'xl'} className="font-semibold leading-[18px]">
            {member?.name}
          </Text>
          <Text size={'sm'} className="font-semibold text-gray-500">
            {member?.churchName}
          </Text>
        </div>

        <CustomIcon name="ChevronRight" className="size-5" />
      </div>

      <Spacing size={20} />

      <div className="overflow-auto flex gap-3 px-3 no-scrollbar">
        <MyProfileBox imgUrl="/icon/talant.png" name="내 달란트" content={`${member?.availableTalentReward}T`} />
        <MyProfileBox imgUrl="/icon/fire.png" name="연속 미션" content={`${member?.availableMissionCount}개`} />
        <MyProfileBox imgUrl="/icon/target.png" name="참여 가능" content={`${member?.availableMissionCount}개`} />
        <MyProfileBox imgUrl="/icon/success.png" name="완료 미션" content={`${member?.availableMissionCount}개`} />
      </div>
    </>
  );
};

function MyProfileBox({ imgUrl, name, content }: { imgUrl: string; name: string; content: string }) {
  return (
    <div className="shrink-0 flex-center gap-2 p-3 rounded-lg bg-white shadow-xs">
      <Image src={imgUrl} alt="profile" width={45} height={45} />
      <div className="flex flex-col">
        <Text size={'sm'} className="text-gray-500">
          {name}
        </Text>
        <Text size={'lg'} className="font-semibold ">
          {content}
        </Text>
      </div>
    </div>
  );
}
