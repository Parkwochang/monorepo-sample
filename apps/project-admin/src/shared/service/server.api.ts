'use server';

import { httpServerInstance } from '@workspace/http/lib';
import { SHARED_URL } from '@workspace/http/must/url';
import type { ResJson } from '@workspace/http/types/app';
import type { HTTPErrorType } from '@workspace/http/lib/http';

import { throwHttpError } from '@/lib/helpers';

// ----------------------------------------------------------------------

/**
 * 엑세스 토큰 검증
 * @param accessToken 엑세스 토큰
 * @returns 토큰 검증 결과 (만료시 새로운 토큰 반환)
 * @example
 * const token = await validateAccessToken(accessToken);
 * if (token) {
 *   setServerCookie('WSAT', token);
 * }
 */
export async function validateAccessToken(accessToken: string) {
  if (!accessToken) return null;

  const { httpStatus, message } = await httpServerInstance
    .get(SHARED_URL.validateToken, {
      searchParams: {
        accessToken,
      },
    })
    .json<ResJson<null>>();

  return httpStatus === 401 ? message : null;
}

/**
 * promise 에러 처리 함수
 * @param promiseData 에러 처리할 프로미스 데이터 (api 요청 함수)
 * @returns 에러 처리된 프로미스 데이터
 * @description 프로미스 요청 중 reject 될 경우 status 코드가 있으면 throwHttpError 함수를 통해 에러 처리
 * @example
 * const data = await withThrowOnError(apiRequest());
 * if (data) {
 *   return data;
 * }
 */
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
