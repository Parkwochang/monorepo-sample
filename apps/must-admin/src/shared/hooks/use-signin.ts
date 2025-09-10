'use client';

import type { AuthEntity } from '@workspace/http/must/auth';

import { deleteServerCookie } from '@/server';
import { useCustomRouter } from './use-router';

// ----------------------------------------------------------------------

interface UserInfo extends AuthEntity.UserInfo {}

export const useSignInHandler = (userInfo: UserInfo) => {
  const { push, replace } = useCustomRouter();

  const handleClick = async () => {
    if (!userInfo) {
      return push('/sign-in');
    }

    await deleteServerCookie(['WSAT', 'WSET']);

    replace('/sign-in');
  };

  return {
    isSignedIn: !!userInfo,
    buttonName: userInfo ? '로그아웃' : '로그인',
    handleClick,
  };
};
