import type { NextAuthOptions } from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProdider from 'next-auth/providers/naver';

export const NEXT_AUTH_SETTING = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 * 60,
    updateAge: 6 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/',
    error: '/error',
    verifyRequest: '/sign-in',
  },
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
    NaverProdider({
      clientId: process.env.AUTH_NAVER_ID!,
      clientSecret: process.env.AUTH_NAVER_SECRET!,
    }),
  ],
} satisfies NextAuthOptions;
