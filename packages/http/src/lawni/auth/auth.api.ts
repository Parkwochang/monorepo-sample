import { SHARED_URL } from '@workspace/http/lawni/url';
import type { ResJson } from '@workspace/http/types/app';
import { httpInstance } from '@workspace/http/lib';

import { LoginResDto, type AuthEntity } from './auth.dto';

// ----------------------------------------------------------------------

export const login = async (json: AuthEntity.Login) => {
  const { data } = await httpInstance
    .post(SHARED_URL.login, {
      json,
    })
    .json<ResJson<AuthEntity.LoginRes>>();

  const { accessToken } = LoginResDto.parse(data);

  return { accessToken };
};
