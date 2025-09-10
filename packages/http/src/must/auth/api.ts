import { getServerCookie, MustInstance } from '@workspace/http/lib';
import { SHARED_URL } from '@workspace/http/must/url';
import type { ResJson } from '@workspace/http/types/app';

import { LoginResDto, type AuthEntity } from './dto';

// ----------------------------------------------------------------------

export const login = async (json: AuthEntity.Login) => {
  const { data } = await MustInstance.post(SHARED_URL.login, {
    json,
  }).json<ResJson<AuthEntity.LoginRes>>();

  const { accessToken } = LoginResDto.parse(data);

  return { accessToken };
};

export const getUser = async () => {
  const userInfo = (await getServerCookie('WSAT')) as string | undefined;

  return userInfo;
};
