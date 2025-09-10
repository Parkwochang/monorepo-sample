'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

import { LoginBtn } from '@workspace/ui/components/button';
import { Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';
import { LOGIN_INFO } from '@/config/config-map';

// ----------------------------------------------------------------------

export const OAuthLoginForm = () => {
  const handleSignIn = (sns: SNSType) => () => signIn(sns);

  return (
    <>
      {/* 이미지 */}
      <div className="px-[26px] mt-[26px]">
        <div className="h-[300px] relative">
          <Image src="/placeholder.png" fill className="object-contain" alt="login_img" loading="lazy" />
        </div>
      </div>
      <Spacing size={30} />

      {/* 소셜 로그인 버튼 */}
      {Object.entries(LOGIN_INFO).map(([sns, loginData]) => (
        <LoginBtn key={sns} onClick={handleSignIn(sns as SNSType)} loginData={loginData} />
      ))}

      {/* 이메일 로그인 버튼 */}
      <div className="mt-[30px] flex items-center justify-center">
        <Link href="?type=email">
          <Text className="leading-[20px] text-gray-800 font-medium underline">이메일로 로그인</Text>
        </Link>
        <div className="mx-5 h-[14px] w-px bg-gray-300"></div>
        <Link href="/sign-up">
          <Text className="leading-[20px] text-gray-800 font-medium underline">이메일로 회원가입</Text>
        </Link>
      </div>
    </>
  );
};
