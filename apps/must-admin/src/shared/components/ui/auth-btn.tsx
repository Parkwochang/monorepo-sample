'use client';

import type { AuthEntity } from '@workspace/http/must/auth';
import { Button } from '@workspace/ui/components/button';

import { useSignInHandler } from '@/shared/hooks';

// ----------------------------------------------------------------------

interface AuthButtonProps {
  userInfo: AuthEntity.UserInfo;
}

export const AuthButton = ({ userInfo }: AuthButtonProps) => {
  const { handleClick, buttonName } = useSignInHandler(userInfo);

  return (
    <Button size="sm" onClick={handleClick}>
      {buttonName}
    </Button>
  );
};
