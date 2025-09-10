'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath, revalidateTag } from 'next/cache';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface CookieOptions {
  name: string;
  value: string;
  options?: Partial<ResponseCookie>;
}

// ----------------------------------------------------------------------
// ! 쿠키 관리

export async function getServerCookie<T extends string | string[]>(name: T) {
  const cookieStore = await cookies();

  if (typeof name === 'string') return cookieStore.get(name)?.value;

  const result: Record<string, string | undefined> = {};

  name.forEach((name) => {
    result[name] = cookieStore.get(name)?.value;
  });

  return result;
}

export async function setServerCookie(args: CookieOptions[] | CookieOptions) {
  const cookieStore = await cookies();

  if (Array.isArray(args)) {
    return args.forEach(({ name, value, options }, index) => {
      cookieStore.set(name, value ?? '', options);
    });
  }

  const { name, value, options } = args;

  cookieStore.set(name, value, options);
}

export async function deleteServerCookie(name: string | string[]) {
  const cookieStore = await cookies();

  if (typeof name === 'string') return cookieStore.delete(name);

  return name.forEach((name) => cookieStore.delete(name));
}

// ----------------------------------------------------------------------
// ! 리다이렉트 관리

export async function redirectPage(url: string | null | undefined) {
  url && redirect(url);
}

// ----------------------------------------------------------------------
// ! 데이터 재검증 관리

export async function revaildateData(option: { path?: string; tag?: string }) {
  if (option.tag) return revalidateTag(option.tag);

  if (option.path) return revalidatePath(option.path);

  return;
}
