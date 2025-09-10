'use client';

import { signIn } from 'next-auth/react';

import { LoginBtn } from '@workspace/ui/components/button';

import { LOGIN_INFO } from '@/config/config-map';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const { push } = useRouter();

  const handleSignIn = (sns: SNSType) => () => signIn(sns);

  return (
    <div className="pb-15">
      {Object.entries(LOGIN_INFO).map(([sns, loginData]) => (
        <LoginBtn key={sns} onClick={handleSignIn(sns as SNSType)} loginData={loginData} />
      ))}
      <LoginBtn
        onClick={() => push('/sign-in?type=email')}
        loginData={{
          title: '이메일로 로그인',
          style: 'bg-[#5353D3]',
          textStyle: 'text-white font-medium',
        }}
      />
    </div>
  );
};
