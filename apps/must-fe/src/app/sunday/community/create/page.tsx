import { CreateBoardScreen } from '@/domian/sunday/components';
import { validateUserPermissions } from '@/shared/service';
import { USER_ROLE } from '@/config/config-map';

export default async function CommunityCreatePage() {
  const userInfo = await validateUserPermissions(USER_ROLE);
  return <CreateBoardScreen userInfo={userInfo} />;
}
