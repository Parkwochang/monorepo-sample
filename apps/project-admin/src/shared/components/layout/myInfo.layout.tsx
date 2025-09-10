'use client';

import { useMyInfo } from '@/shared/hooks';
import type { AuthEntity } from '@workspace/http/must/auth';

// ----------------------------------------------------------------------

interface MyInfoLayoutProps {
  children: React.ReactNode;
  userInfo?: AuthEntity.UserInfo;
}

export const MyInfoLayout = ({ children, userInfo }: MyInfoLayoutProps) => {
  const myInfo = useMyInfo(userInfo);

  return <>{children}</>;
};
