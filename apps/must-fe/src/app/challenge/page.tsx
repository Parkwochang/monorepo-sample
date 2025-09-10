import { BackBtnHeader } from '@/shared/components/header';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { Heading, Text } from '@workspace/ui/components/text';
import Image from 'next/image';
import Link from 'next/link';

export default function ChallengePage() {
  return (
    <>
      <BackBtnHeader />
      <main className="pt-[50px] px-5 relative h-dvh overflow-auto bg-white">
        <Spacing size={20} />
        <div className="rounded-lg bg-gray-100 h-[200px] relative overflow-hidden">
          <Image src={'/images/challenge.jpg'} alt="challenge-bg" fill className="object-cover" />
        </div>
        <Spacing size={20} />
        <Heading size="lg">감상평 챌린지</Heading>
        <Spacing size={20} />
        <div className="flex items-center gap-2">
          <Text as="p" className="text-white px-3 py-1 rounded-lg bg-pink-500">
            영상 시청
          </Text>
          <Text as="p" className="text-white px-3 py-1 rounded-lg bg-orange-500">
            7일 미션
          </Text>
          <Text as="p" className="text-white px-3 py-1 rounded-lg bg-violet-500">
            2,500T
          </Text>
        </div>
        <Spacing size={40} />
        <Text as="p" className="whitespace-pre-wrap">
          {`영상 속 내용을 보고 감상평을 작성해주세요.\n감상평은 개인의 주관적인 생각이며, 타인에 대한 평가가 아닙니다.\n\n또한 영상 속 내용을 반영하여 작성해주세요.\n\n\n감상평은 50자 이상 100자 이하로 작성해주세요.
          `}
        </Text>

        <div className="fixed bottom-0 inset-x-0 px-5 py-4">
          <Button size={'lg'} className="w-full" asChild>
            <Link href="/challenge/write">미션 시작</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
