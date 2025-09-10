'use client';

import { useDeleteChurch, useDeleteChurchSchedule } from './use-mutations';

// ----------------------------------------------------------------------

export const useDeleteAdminChurch = () => {
  const { mutateAsync: deleteChurch, isPending } = useDeleteChurch();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteChurch(id)));
  };

  return { handleDelete, isPending };
};

// ----------------------------------------------------------------------

export const useDeleteAdminChurchSchedule = () => {
  const { mutateAsync: deleteChurchSchedule, isPending } = useDeleteChurchSchedule();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteChurchSchedule(id)));
  };

  return { handleDelete, isPending };
};
