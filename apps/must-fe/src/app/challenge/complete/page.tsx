'use client';

import { BackBtnHeader } from '@/shared/components/header';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { Text } from '@workspace/ui/components/text';
import Image from 'next/image';
import Link from 'next/link';

export default function ChallengeCompletePage() {
  return (
    <>
      <BackBtnHeader />
      <main className="flex flex-col items-center justify-between py-10 h-screen px-8">
        <div className="w-full flex-1 flex flex-col gap-2 items-center justify-center">
          <Text className="text-center font-semibold text-gray-600">조금만 더 힘내세요!</Text>
          <Text className="text-center text-2xl font-bold">Day3 미션 참여 완료</Text>
          <Spacing size={20} />
          <Image src={'/images/mission_success.png'} alt="mission-complete" width={150} height={150} />
        </div>
        <Spacing size={20} />
        <div className="p-3 rounded-md border grid grid-cols-7 w-full gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="col-span-1">
              <Text as="p" className="text-center font-bold">
                {index + 1}
              </Text>
              {index < 3 ? (
                <Image src={'/images/Check.png'} alt="mission-complete" width={150} height={150} />
              ) : (
                <Image src={'/images/Question.png'} alt="mission-complete" width={150} height={150} />
              )}
            </div>
          ))}
        </div>
        <Spacing size={70} />
        <Button size={'full'} asChild>
          <Link href="/" replace>
            완료
          </Link>
        </Button>
      </main>
    </>
  );
}
