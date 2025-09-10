import type { NextAuthOptions } from 'next-auth';

import { NEXT_AUTH_SETTING } from '@/config/setting';
import { oauthLogin } from '@/shared/service';

// ----------------------------------------------------------------------

export const authOptions = {
  ...NEXT_AUTH_SETTING,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return { ...token, access_token: account.access_token, provider: account.provider };
      }
      return token;
    },

    async session({ token, session }: any) {
      session = { ...token };
      return session;
    },

    async signIn({ user, account, profile }) {
      if (user === null) return false;
      try {
        const userInfo = {
          accountId: '',
          email: '',
          name: '',
        };

        if (account?.provider === 'kakao') {
          userInfo.accountId = user.id;
          userInfo.email = user.email ?? '';
          userInfo.name = user.name ?? '';
        } else {
          const {
            response: { id, email, name },
          } = profile as any;

          userInfo.accountId = id;
          userInfo.email = email;
          userInfo.name = name;
        }

        await oauthLogin(userInfo);

        return '/step';
      } catch (err) {
        console.error(err);

        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      return url;
    },
  },
} satisfies NextAuthOptions;

// const createProvider = <T extends Function>(Provider: T, clientKey: string, secretKey: string) => {
//   return Provider({
//     clientId: process.env[clientKey],
//     clientSecret: process.env[secretKey],
//   });
// };
