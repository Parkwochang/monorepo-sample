'use server';

import { redirect } from 'next/navigation';

import { parseJWT } from '@repo/utils';
import type { AuthEntity } from '@workspace/http/must/auth';

import { checkUserRole } from '@/lib/helpers';
import { deleteServerCookie, getServerCookie, redirectPage, setServerCookie } from './utils';

// ----------------------------------------------------------------------
// ! 유저 정보 관리

export async function getUserInfo() {
  const accessToken = (await getServerCookie('WSAT')) as string | undefined;

  return parseJWT(accessToken) as AuthEntity.UserInfo | undefined;
}

// ----------------------------------------------------------------------
// ! 로그인 관리

export async function logout() {
  deleteServerCookie(['WSAT']);
}

/**
 * 로그인 성공 후 처리 함수
 * @param accessToken 로그인 토큰
 * @returns 유저 권한
 * @description 로그인 성공 후 쿠키에 토큰 저장 후 유저 권한 반환
 * 권한에 따라 이후 페이지 이동
 * @example
 * const userRole = await processLogin(accessToken);
 */
export async function processLogin(accessToken: string) {
  if (!accessToken) return null;

  const userRole = checkUserRole(parseJWT(accessToken) as AuthEntity.UserInfo);

  if (process.env.NODE_ENV === 'development') {
    await setServerCookie([
      {
        name: 'WSAT',
        value: accessToken,
        options: {
          httpOnly: true,
          secure: true,
          maxAge: 60 * 60 * 24 * 30,
        },
      },
    ]);
  }

  return userRole;
}

export async function redirectByRole(role: Awaited<ReturnType<typeof checkUserRole>>) {
  if (!role) return null;
  redirectPage(`/${role.toLowerCase()}`);
}

/**
 * 유저 권한 검증
 * @param role 검증할 권한 (ADMIN, LEADER, PASTOR, MEMBER)
 * @type {AuthEntity.UserInfo['role']}
 * @returns 검증 통과 시 유저 정보 반환
 * @example
 * const userInfo = await validateUserPermissions('ADMIN');
 */
export async function validateUserPermissions(role: AuthEntity.UserInfo['role']) {
  const userInfo = await getUserInfo();
  const userPermissions = checkUserRole(userInfo);

  if (userPermissions || userPermissions === role) {
    return userInfo as AuthEntity.UserInfo;
  }

  redirect('/sign-in');
  // redirectPage('/sign-in');
}

/**
 * 권한 없는 유저 리다이렉트 함수
 * @returns 권한 없는 유저 리다이렉트 (ADMIN, LEADER, PASTOR, MEMBER)
 * @type {AuthEntity.UserInfo['role']}
 * @description 현재 사이트에 접근 할 수 없는 권한 전체를 리다이렉트 처리
 * @example
 * await redirectToAuthorizedPage();
 */
export async function redirectToAuthorizedPage() {
  const userPermissions = checkUserRole(await getUserInfo());

  return redirectByRole(userPermissions);
}
