import { MyPageScreen } from '@/domian/auth/components';
import { validateUserPermissions } from '@/shared/service';
import { USER_ROLE } from '@/config/config-map';

export default async function MyPage() {
  const userInfo = await validateUserPermissions(USER_ROLE);

  return <MyPageScreen userInfo={userInfo} />;
}
