import { getUser } from '@workspace/http/must/auth';
import { fToNow } from '@repo/core/format-time';
import { parseJWT } from '@repo/utils';

import { CheckInFailedScreen, CheckInScreen, PermissionErrorScreen } from './_screen';

interface CheckInPageProps {
  searchParams: Promise<{
    token: string;
  }>;
}

export default async function CheckInPage({ searchParams }: CheckInPageProps) {
  const { token } = await searchParams;
  const userInfo = parseJWT(await getUser());

  if (!token || !userInfo?.churchId) return <PermissionErrorScreen />;

  const decodedToken = JSON.parse(decodeURIComponent(token));

  if (fToNow(decodedToken.date).includes('시간 전')) return <CheckInFailedScreen />;

  return <CheckInScreen memberId={userInfo.id} />;
}

// console.log(fDiffTime('2025-08-05 05:45:51', currentDate));
//   console.log(new Date(decodedToken.date));
