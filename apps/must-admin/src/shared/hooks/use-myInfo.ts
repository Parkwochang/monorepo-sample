'use client';

import { useEffect } from 'react';
import type { AuthEntity } from '@workspace/http/must/auth';

import { useMyInfoStore } from '../store/my-info.store';

// ----------------------------------------------------------------------

export const useMyInfo = (userInfo?: AuthEntity.UserInfo) => {
  const { myInfo, setMyInfo } = useMyInfoStore();

  useEffect(() => {
    if (userInfo) {
      setMyInfo(userInfo);
    }
  }, []);

  return myInfo as AuthEntity.UserInfo;
};
