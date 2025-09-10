'use server';

import { httpServerInstance } from '@workspace/http/lib';
import { CHURCH_URL, MEMBER_URL, SHARED_URL } from '@workspace/http/must/url';
import { type AuthEntity, LoginResDto } from '@workspace/http/lawni/auth';
import { HttpError, type HTTPErrorType } from '@workspace/http/lib/http';
import type { ResJson } from '@workspace/http/types/app';
import type { MemberEntity } from '@workspace/http/must/member';
import type { ChurchEntity } from '@workspace/http/must/church';

import { setServerCookie } from './utils.server';
import { throwHttpError } from '@/lib/helpers/http';

// ----------------------------------------------------------------------

export const oauthLogin = async (json: AuthEntity.OauthLogin) => {
  const { data } = await fetch(`${process.env.BASE_URL}/${SHARED_URL.oauth}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(json),
  }).then((res) => res.json() as Promise<ResJson<AuthEntity.LoginRes>>);

  // const { data } = await httpServerInstance(SHARED_URL.oauth, {
  //   method: 'POST',
  //   json,
  // }).json<ResJson<AuthEntity.LoginRes>>();

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

// ----------------------------------------------------------------------

export const getValidateUserToken = async (accessToken: string) => {
  const { httpStatus, message } = await httpServerInstance(SHARED_URL.validateToken, {
    method: 'GET',
    searchParams: {
      accessToken,
    },
  }).json<ResJson<AuthEntity.LoginRes>>();

  if (httpStatus === 401) return message;

  return null;
};

// ----------------------------------------------------------------------

export const withThrowOnError = async <T extends Promise<any>>(promiseData: T): Promise<T> => {
  return promiseData.catch((err) => {
    const errStatus = (err as HTTPErrorType).response?.status;

    console.log(errStatus, ' : ', err.message);

    if (!errStatus) return;

    throwHttpError({
      name: err.name,
      status: errStatus,
      message: err.message ?? '',
      stack: err.stack ?? '',
    });
  });
};

// ----------------------------------------------------------------------

export const getUserInfo = async (id: number) => {
  const { data } = await withThrowOnError(
    httpServerInstance.get(MEMBER_URL.memberById(id)).json<ResJson<MemberEntity.MemberRes>>(),
  );

  return data;
};

// ----------------------------------------------------------------------

export const getServerChurchById = async (id: number) => {
  const { data } = await withThrowOnError(
    httpServerInstance.get(CHURCH_URL.churchById(id)).json<ResJson<ChurchEntity.Church>>(),
  );

  return data;
};
