import { USER_ROLE } from '@/config/config-map';
import { ProfileScreen } from '@/domian/auth/components';
import { getUserInfo, validateUserPermissions } from '@/shared/service';

export default async function MyProfilePage() {
  const userInfo = await validateUserPermissions(USER_ROLE);

  const member = await getUserInfo(userInfo.id);

  return <ProfileScreen userInfo={member} />;
}
