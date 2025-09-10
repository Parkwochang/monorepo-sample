import { getParsedUserJwt } from '@/shared/service';
import { AdditionalChurchForm } from './sign-in';

export const AdditionalInfoScreen = async () => {
  const userInfo = await getParsedUserJwt();

  if (!userInfo) return null;

  return <AdditionalChurchForm memberId={userInfo.id} />;
};
