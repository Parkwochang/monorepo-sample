'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface CookieOptions {
  name: string;
  value: string;
  options?: Partial<ResponseCookie>;
}

// ----------------------------------------------------------------------
// ! 쿠키 관리

export const setServerCookie = async (args: CookieOptions[] | CookieOptions) => {
  const cookieStore = await cookies();

  if (Array.isArray(args)) {
    return args.forEach(({ name, value, options }, index) => {
      cookieStore.set(name, value ?? '', options);
    });
  }

  const { name, value, options } = args;

  cookieStore.set(name, value, options);
};

export const getServerCookie = async (name: string | string[]) => {
  const cookieStore = await cookies();

  if (typeof name === 'string') return cookieStore.get(name)?.value;

  return name.map((name) => cookieStore.get(name)?.value);
};

export const deleteServerCookie = async (name: string | string[]) => {
  const cookieStore = await cookies();

  if (typeof name === 'string') return cookieStore.delete(name);

  return name.forEach((name) => cookieStore.delete(name));
};

// ----------------------------------------------------------------------
// ! 응답 관리

export const redirectPage = async (url?: string) => {
  return url && redirect(url);
};
