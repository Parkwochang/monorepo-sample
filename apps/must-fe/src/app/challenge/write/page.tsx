'use client';

import { BackBtnHeader } from '@/shared/components/header';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { Textarea } from '@workspace/ui/components/form';
import { Heading, Text } from '@workspace/ui/components/text';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ReactPlayer from 'react-player';

export default function ChallengeWritePage() {
  const [value, setValue] = useState('');
  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    push('/challenge/complete');
  };

  return (
    <>
      <BackBtnHeader />
      <main className="pt-[50px] px-5 h-dvh overflow-auto bg-white">
        <Spacing size={10} />
        <Heading size="lg">Day 3</Heading>
        <Spacing size={10} />
        <div className="rounded-lg bg-gray-100 h-[200px] relative overflow-hidden pt-[56.25%]">
          <ReactPlayer
            src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            width="100%"
            height="100%"
            autoPlay
            loop
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <Spacing size={40} />

        <Text as="p" className="text-gray-600">
          "오늘 시청한 영상을 통해 받은 은혜와 깨달음을 나누어주세요"
        </Text>
        <Spacing size={10} />
        <Text as="p" size={'sm'} className="text-gray-500">
          -영상에서 가장 인상 깊었던 말씀이나 장면을 적어주세요
        </Text>

        <Text as="p" size={'sm'} className="text-gray-500">
          -개인적으로 받은 감동이나 깨달음을 솔직하게 표현해주세요
        </Text>
        <Text as="p" size={'sm'} className="text-gray-500">
          -일상생활에 어떻게 적용할 수 있을지 나누어주세요
        </Text>
        <Text as="p" size={'sm'} className="text-gray-500">
          -다른 성도들에게 전하고 싶은 메시지가 있다면 함께 적어주세요
        </Text>
        <Spacing size={40} />
        <div className="fixed bottom-0 left-0 right-0 rounded-t-lg p-3 bg-white border-t">
          <Textarea value={value} onChange={handleChange} />
          <Spacing size={20} />
          <Button size="lg" className="w-full" disabled={!value} onClick={handleSubmit}>
            미션 제출
          </Button>
        </div>
      </main>
    </>
  );
}
