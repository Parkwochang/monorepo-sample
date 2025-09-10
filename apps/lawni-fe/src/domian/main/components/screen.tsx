import { NavFooter } from '@/shared/components/footer';
import { NavHeader } from '@/shared/components/header';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { Heading, Text } from '@workspace/ui/components/text';
import { LoginForm } from './login-form';
import Image from 'next/image';

interface MainScreenProps {
  bible: {
    content: string;
    volume: string;
    sheet: string;
    verse: string;
  };
}

export const MainScreen = () => {
  return (
    <main className="h-dvh px-5 flex flex-col bg-background">
      <div className="flex-1 flex flex-col gap-10 justify-center items-center">
        {/* <Image src={'/images/main.png'} alt="logo" width={250} height={250} className="rounded-2xl" /> */}
        <Heading asType="h1" size={'xl'} className="text-center text-5xl pt-10">
          LAWNI
        </Heading>
        <div>
          <Text as="p" size={'lg'} className="text-center">
            변호사님께 무엇을 어떻게 말해야 할지 막막하신가요?
          </Text>
          <Text as="p" size={'lg'} className="text-center">
            LawNi와 대화하며 사건의 핵심을 정리하고,
          </Text>
          <Text as="p" size={'lg'} className="text-center">
            효율적인 상담을 준비하세요.
          </Text>
          <Text as="p" size={'sm'} className="text-gray-400 mt-4 text-center">
            개인정보는 저장되지 않으며, 오직 사건 정리만 도와드립니다.
          </Text>
        </div>
      </div>

      <LoginForm />

      {/* <div className="flex flex-col gap-4 pb-10">
        <Button size={'xl'} className="w-full">
          로그인하기
        </Button>
        <Button size={'xl'} className="w-full">
          시작하기
        </Button>
      </div> */}
    </main>
  );
};
