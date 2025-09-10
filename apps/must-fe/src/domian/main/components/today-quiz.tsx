'use client';

import Link from 'next/link';

import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { CustomIcon, Text } from '@workspace/ui/components/text';

import { useGetMissionSchedulesToday } from '@/domian/mission/hooks';

// ----------------------------------------------------------------------

export const TodayQuiz = () => {
  const { data: quiz } = useGetMissionSchedulesToday();

  if (!quiz?.length) return null;

  const todayQuiz = quiz.find((item) => item.templateMissionType === 'MULTI');

  return (
    <div className="w-full bg-white rounded-3xl py-4 px-5">
      <Text as="p" className="text-wrap font-semibold text-center text-[#FF9500]">
        QUIZ
      </Text>
      <Spacing size={10} />
      <Text as="p" className="text-wrap font-semibold text-center">
        {todayQuiz?.templateDescription}
      </Text>
      <Spacing size={20} />
      <div className="flex-center">
        <Button variant={'ghost'} size={'xs'} className="text-xs rounded-full border border-[#FF9500]" asChild>
          {todayQuiz?.isExecution ? (
            <div>
              <CustomIcon name="BadgeCheck" strokeWidth={3} className="text-[#FF9500]" />
              퀴즈 완료
            </div>
          ) : (
            <Link href="/mission">
              퀴즈 풀기
              <CustomIcon name="ArrowRight" strokeWidth={3} className="text-[#FF9500]" />
            </Link>
          )}
        </Button>
      </div>
    </div>
  );
};
