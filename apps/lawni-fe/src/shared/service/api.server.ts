'use server';

import { httpServerInstance } from '@workspace/http/lib';
import { type AuthEntity, LoginResDto } from '@workspace/http/lawni/auth';
import type { ResJson } from '@workspace/http/types/app';
import { SHARED_URL } from '@workspace/http/lawni/url';

import { setServerCookie } from './utils.server';

// ----------------------------------------------------------------------

export const oauthLogin = async (json: AuthEntity.OauthLogin) => {
  // const { data } = await httpServerInstance(SHARED_URL.oauth, {
  //   method: 'POST',
  //   json,
  // }).json<ResJson<AuthEntity.LoginRes>>();

  const { data } = await fetch(`${process.env.BASE_URL}/${SHARED_URL.oauth}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(json),
  }).then((res) => res.json());

  console.log('test : ', json, data);

  const { accessToken } = LoginResDto.parse(data);

  await setServerCookie([
    {
      name: 'WSAT',
      value: accessToken,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      },
    },
  ]);
  return accessToken;
};

export const getValidateUserToken = async (accessToken: string) => {
  const { httpStatus, message } = await httpServerInstance
    .get(SHARED_URL.validateToken, {
      searchParams: {
        accessToken,
      },
    })
    .json<ResJson<AuthEntity.LoginRes>>();

  return httpStatus === 401 ? message : null;
};
