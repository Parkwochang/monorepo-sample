import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@workspace/ui/components/button';
import { Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';

import { BackBtnHeader } from '@/shared/components/header';

// ------------------------------------------------------------

interface MissionCompletePageProps {
  searchParams: Promise<{
    result: 'success' | 'fail';
  }>;
}

const MissionComplete = {
  success: {
    title: '미션 참여 완료',
    description: '1000 달란트를 획득했어요!',
    image: '/images/mission_success.png',
  },
  fail: {
    title: '미션 참여 완료',
    description: '내일 다시 도전해주세요!',
    image: '/images/mission_fail.png',
  },
};

export default async function MissionCompletePage({ searchParams }: MissionCompletePageProps) {
  const { result } = await searchParams;

  const { title, description, image } = MissionComplete[result];

  return (
    <>
      <BackBtnHeader />
      <main className="flex flex-col items-center justify-between py-10 h-screen px-8">
        <div className="w-full flex-1 flex flex-col gap-2 items-center justify-center">
          <Text className="text-center text-xl font-bold text-gray-600">{title}</Text>
          <Text className="text-center font-semibold text-2xl">{description}</Text>
          <Spacing size={20} />
          <Image src={image} alt="mission-complete" width={250} height={250} />
        </div>
        <Button size={'full'} asChild>
          <Link href="/" replace>
            완료
          </Link>
        </Button>
      </main>
    </>
  );
}
