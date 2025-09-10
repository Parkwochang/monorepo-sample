'use client';

import { useQueryClient } from '@tanstack/react-query';

import { Spacing } from '@workspace/ui/components/box';
import { Text } from '@workspace/ui/components/text';
import { AuthEntity } from '@workspace/http/must/auth';

import { TodayQuiz } from './today-quiz';

interface MyInfoProps {
  bible: {
    content: string;
    volume: string;
    sheet: string;
    verse: string;
  };
}

export function MyInfo({ bible }: MyInfoProps) {
  const queryClient = useQueryClient();
  const myInfo = queryClient.getQueryData(['myInfo']) as AuthEntity.UserInfo;

  return (
    <div className="bg-[#FF9500] py-5 px-8">
      <Text as="p" className="text-wrap font-bold tracking-wide text-xl">
        샬롬 {myInfo?.name}님
      </Text>

      <Spacing size={20} />

      <Text as="p" className="text-wrap text-white font-normal">
        "{bible.content}"
      </Text>
      <Text as="p" size="sm" className="text-gray-600 text-end font-normal mt-2">
        {bible.volume} {bible.sheet}:{bible.verse}
      </Text>

      <Spacing size={40} />

      <TodayQuiz />
    </div>
  );
}
