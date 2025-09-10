'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { login, type AuthEntity } from '@workspace/http/lawni/auth';
import { USER_URL } from '@workspace/http/lawni/url';

import { getParsedUserJwt, processLogin } from '@/shared/service';
import { parseJWT } from '@repo/utils';
// import { parseUserInfo } from '@/lib/helpers';

// ----------------------------------------------------------------------

export const useLoginMutation = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (data: AuthEntity.Login) => login(data),
    onSuccess: async (data) => {
      const userInfo = parseJWT(data.accessToken);

      if (process.env.NODE_ENV === 'development') {
        await processLogin(data.accessToken);
      }

      replace(userInfo ? `/step` : `/`);
    },
  });
};
