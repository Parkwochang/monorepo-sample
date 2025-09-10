'use server';

import type { AuthEntity } from '@workspace/http/must/auth';

import { getUserInfo } from '@/shared/service';
import { getDehydratedQueries, HydrateQueryClient } from '../provider';

// ----------------------------------------------------------------------

interface MyInfoLayoutProps {
  children: React.ReactNode;
  userInfo: AuthEntity.UserInfo;
}

export const MyInfoLayout = async ({ children, userInfo }: MyInfoLayoutProps) => {
  const queries = await getDehydratedQueries([
    {
      queryKey: ['myInfo'],
      queryFn: () => getUserInfo(userInfo?.id),
    },
  ]);

  return <HydrateQueryClient state={{ queries }}>{children}</HydrateQueryClient>;
};
