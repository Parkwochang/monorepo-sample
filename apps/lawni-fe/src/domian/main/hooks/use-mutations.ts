'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { login, type AuthEntity } from '@workspace/http/lawni/auth';
import { USER_URL } from '@workspace/http/lawni/url';

import { processLogin } from '@/shared/service';
// import { parseUserInfo } from '@/lib/helpers';

// ----------------------------------------------------------------------

export const useLoginMutation = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (data: AuthEntity.Login) => login(data),
    onSuccess: async (data) => {
      // const userInfo = parseUserInfo(data.accessToken);
      // if (process.env.NODE_ENV === 'development') {
      //   await processLogin(data.accessToken);
      // }
      // replace(userInfo?.churchId ? `/` : `/additional-info`);
    },
  });
};
