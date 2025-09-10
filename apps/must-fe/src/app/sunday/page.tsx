import Image from 'next/image';

import { CustomIcon, Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';

import { NavFooter } from '@/shared/components/footer';
import { getServerChurchById, validateUserPermissions } from '@/shared/service';
import { USER_ROLE } from '@/config/config-map';
import { DashboardScreen } from '@/domian/sunday/components';

// ----------------------------------------------------------------------

export default async function SundayPage() {
  const userInfo = await validateUserPermissions(USER_ROLE);

  const myChurch = await getServerChurchById(userInfo.churchId);

  return <DashboardScreen myChurch={myChurch} />;

  return (
    <>
      <main className="pb-[100px] min-h-dvh bg-[#FCFBFC]">
        <div
          className="h-[200px] bg-cover bg-center relative overflow-hidden"
          style={{
            backgroundImage: `url(${myChurch.profileImageUrl || '/images/church.jpg'})`,
          }}
        >
          <div className="absolute top-[50%] inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-black/10 blur-sm" />
          <div className="absolute bottom-5 px-5">
            <Text as="p" size={'xl'} className="text-white">
              {myChurch.churchName}
            </Text>
            <Text as="p" size={'sm'} className="text-gray-300">
              {myChurch.address}
            </Text>
          </div>
        </div>

        <Spacing size={20} />

        <div className="px-5">
          <div className="p-4 rounded-lg flex justify-between shadow-sm bg-white">
            <div>
              <Text as="p" size={'lg'} className="font-semibold">
                주일 예배
              </Text>
              <Text as="p" size={'sm'} className="text-gray-700">
                본당 대강당
              </Text>
            </div>

            <div className="flex flex-col gap-1 items-end">
              <Text className="rounded-full px-3 py-1 bg-purple-200 text-purple-700">Today</Text>
              <Text size={'sm'} className="text-gray-500">
                2025.08.25 10:00
              </Text>
            </div>
          </div>
        </div>

        <Spacing size={20} />

        <div className="grid grid-cols-2 gap-3 px-5">
          <div className="p-3 rounded-lg flex-center flex-col gap-2 shadow-sm bg-white">
            <Image src={'/images/ai.svg'} alt="" width={80} height={80} />
            <Text as="p" size={'lg'} className="font-semibold text-purple-500">
              AI 성경 해석
            </Text>
          </div>
          <div className="p-3 rounded-lg flex-center flex-col gap-2 shadow-sm bg-white">
            <Image src={'/images/ai.svg'} alt="" width={80} height={80} />
            <Text as="p" size={'lg'} className="font-semibold text-purple-500">
              AI 성경 해석
            </Text>
          </div>
        </div>

        <Spacing size={40} />

        <div className="flex justify-between px-5">
          <Text size={'lg'} className="font-semibold">
            일정
          </Text>
          <CustomIcon name="ChevronRight" size={20} />
        </div>

        <Spacing size={10} />

        <div className="flex gap-3 overflow-auto py-2 px-5 no-scrollbar">
          <div className="shrink-0 w-[150px] h-[150px] rounded-lg shadow-sm p-3 flex flex-col justify-between bg-white">
            <Text className="font-semibold pb-5">25일</Text>
            <div className="flex-1">
              <Text className="text-blue-400">09:00 주일 예배</Text>
              <Text className="text-purple-400">12:00 단체 식사</Text>
            </div>
          </div>
          <div className="shrink-0 w-[150px] h-[150px] rounded-lg shadow-sm p-3 flex flex-col justify-between bg-white">
            <Text className="font-semibold pb-5">26일</Text>
            <div className="flex-1">
              <Text className="text-blue-400">09:00 주일 예배</Text>
              <Text className="text-purple-400">12:00 단체 식사</Text>
            </div>
          </div>
          <div className="shrink-0 w-[150px] h-[150px] rounded-lg shadow-sm p-3 flex flex-col justify-between bg-white">
            <Text className="font-semibold pb-5">27일</Text>
            <div className="flex-1">
              <Text className="text-blue-400">09:00 주일 예배</Text>
              <Text className="text-purple-400">12:00 단체 식사</Text>
            </div>
          </div>
          <div className="shrink-0 w-[150px] h-[150px] bg-gray-200 rounded-lg shadow-sm"></div>
        </div>

        <Spacing size={20} />

        <div className="px-5">
          <div className="flex justify-between">
            <Text size={'lg'} className="font-semibold">
              커뮤니티
            </Text>
            <CustomIcon name="ChevronRight" size={20} />
          </div>
          <Spacing size={10} />
          <div className="flex flex-col gap-3 rounded-lg shadow-sm p-3 bg-white">
            <div className="p-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gray-200" />
                <Text size={'sm'} className="font-medium text-gray-500">
                  박창우
                </Text>
                <Text size={'sm'} className="text-gray-500">
                  18시간 전
                </Text>
              </div>
              <Spacing size={5} />
              <Text className="text-wrap line-clamp-2 text-ellipsis">
                주님을 위한 한걸음 <br />
                주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을
                위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음
              </Text>
            </div>
            <div className="p-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gray-200" />
                <Text size={'sm'} className="font-medium text-gray-500">
                  박창우
                </Text>
                <Text size={'sm'} className="text-gray-500">
                  18시간 전
                </Text>
              </div>
              <Spacing size={5} />
              <Text className="text-wrap line-clamp-2 text-ellipsis">
                주님을 위한 한걸음 <br />
                주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을
                위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음
              </Text>
            </div>
            <div className="p-2 border-b last:border-b-0">
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-gray-200" />
                <Text size={'sm'} className="font-medium text-gray-500">
                  박창우
                </Text>
                <Text size={'sm'} className="text-gray-500">
                  18시간 전
                </Text>
              </div>
              <Spacing size={5} />
              <Text className="text-wrap line-clamp-2 text-ellipsis">
                주님을 위한 한걸음 <br />
                주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음 주님을
                위한 한걸음 주님을 위한 한걸음 주님을 위한 한걸음
              </Text>
            </div>
          </div>
        </div>

        <Spacing size={20} />
      </main>

      <NavFooter />
    </>
  );
}
