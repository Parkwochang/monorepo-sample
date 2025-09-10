'use client';

import { useGetMember, useUpdateAdminMember } from '../hooks';
import { MemberAdminForm } from './member-form';

// ----------------------------------------------------------------------
// TODO : loading 필요

export const MemberUpdateScreen = ({ id }: { id: number }) => {
  const { data: userInfo } = useGetMember(id);

  if (!userInfo) return null;

  return <MemberAdminForm member={userInfo} />;
};
