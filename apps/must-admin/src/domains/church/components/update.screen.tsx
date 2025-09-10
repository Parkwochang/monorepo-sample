'use client';

import { useGetChurchById } from '../hooks';
import { ChurchAdminForm } from './church-form';

// ----------------------------------------------------------------------
// TODO : loading 필요

export const ChurchUpdateScreen = ({ id }: { id: number }) => {
  const { data: userInfo } = useGetChurchById(id);

  if (!userInfo) return null;

  return <ChurchAdminForm church={userInfo} />;
};
