'use client';

import { deleteServerCookie } from '@workspace/http/lib';
import { Button } from '@workspace/ui/components/button';
import { redirect, useRouter } from 'next/navigation';

interface AuthButtonProps {
  userInfo: any;
}

export const AuthButton = ({ userInfo }: AuthButtonProps) => {
  const { push } = useRouter();

  console.log(userInfo);

  const handleClick = async () => {
    if (!userInfo) {
      return push('/sign-in');
    }

    await deleteServerCookie(['WSAT', 'WSET']);

    redirect('/sign-in');
  };

  return (
    <Button size="sm" onClick={handleClick}>
      {userInfo ? '로그아웃' : '로그인'}
    </Button>
  );
};
