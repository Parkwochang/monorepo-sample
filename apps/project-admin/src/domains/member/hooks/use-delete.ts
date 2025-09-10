'use client';

import { useCancleWithdrawal, useDeleteMember } from './use-mutations';

// ----------------------------------------------------------------------

export const useDeleteAdminMember = () => {
  const { mutateAsync: deleteMember, isPending } = useDeleteMember();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteMember(id)));
  };

  return { handleDelete, isPending };
};

export const useDeleteAdminWithdrawal = () => {
  const { mutateAsync: deleteWithdrawal, isPending } = useCancleWithdrawal();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteWithdrawal(id)));
  };

  return { handleDelete, isPending };
};
