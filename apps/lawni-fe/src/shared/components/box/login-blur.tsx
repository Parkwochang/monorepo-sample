'use client';

import Link from 'next/link';

import { Button } from '@workspace/ui/components/button';
import { Text } from '@workspace/ui/components/text';
import { AuthEntity } from '@workspace/http/must/auth';

export const LoginBlur = ({ userInfo }: { userInfo: AuthEntity.UserInfo | null }) => {
  if (userInfo) return null;

  return (
    <div className="absolute inset-0 bg-white/30 backdrop-blur-sm rounded-2xl p-5 flex-center flex-col gap-3">
      <Text as="p" size="xl" className="font-semibold">
        로그인 후 이용할 수 있어요
      </Text>
      <Text as="p" size="lg" className="font-semibold text-gray-600">
        로그인 또는 회원 가입하여 지금 미션에 참여해 달란트를 획득하세요.
      </Text>
      <Link href="/sign-in" className="w-full">
        <Button size="lg" className="w-full mt-3">
          로그인
        </Button>
      </Link>
    </div>
  );
};
