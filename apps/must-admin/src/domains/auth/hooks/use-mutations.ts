'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { login } from '@workspace/http/must/auth';
import type { AuthEntity } from '@workspace/http/must/auth';
import { parseJWT } from '@repo/utils';

import { processLogin } from '@/server';
import { checkUserRole } from '@/lib/helpers';

// ----------------------------------------------------------------------

export const useLogin = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (data: AuthEntity.Login) => login(data),
    onSuccess: async (data) => {
      let userRole: AuthEntity.UserInfo['role'] | null = null;

      if (process.env.NODE_ENV === 'development') {
        userRole = await processLogin(data.accessToken);
      } else {
        console.log('로그인 권한 추출 진행');
        userRole = checkUserRole(parseJWT(data.accessToken));
      }
      console.log('로그인 완료 및 이동 진행');

      userRole && replace(`/${userRole.toLowerCase()}`);
    },
    meta: {
      errorMessage: '아이디와 비밀번호를 확인해주세요.',
    },
  });
};
