'use client';

import { create } from 'zustand';

import type { AuthEntity } from '@workspace/http/must/auth';

import { createSelectors } from './utils';

// ----------------------------------------------------------------------

interface MyInfoStore {
  myInfo: AuthEntity.UserInfo | null;
  setMyInfo: (myInfo: AuthEntity.UserInfo) => void;
}

export const useMyInfoBase = create<MyInfoStore>((set) => ({
  myInfo: null,
  setMyInfo: (myInfo) => set({ myInfo }),
}));

export const useMyInfoStore = createSelectors(useMyInfoBase);
