'use client';

import {
  useDeleteMissionExecutionMutation,
  useDeleteMissionMutation,
  useDeleteMissionScheduleMutation,
} from './mutations';

// ----------------------------------------------------------------------

export const useDeleteMissionTemplate = () => {
  const { mutateAsync: deleteMission, isPending } = useDeleteMissionMutation();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteMission(id)));
  };

  return { handleDelete, isPending };
};

export const useDeleteMissionSchedule = () => {
  const { mutateAsync: deleteMissionSchedule, isPending } = useDeleteMissionScheduleMutation();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteMissionSchedule(id)));
  };

  return { handleDelete, isPending };
};

export const useDeleteMissionExecution = () => {
  const { mutateAsync: deleteMissionExecution, isPending } = useDeleteMissionExecutionMutation();

  const handleDelete = async (ids: number[]) => {
    await Promise.all(ids.map((id) => deleteMissionExecution(id)));
  };

  return { handleDelete, isPending };
};
