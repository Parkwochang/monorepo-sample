'use client';

import { useMutation } from '@tanstack/react-query';

import type { ChurchEntity } from './dto';
import { createChurch, deleteChurch, updateChurch } from './api';
import { CHURCH_URL } from '../url';

// ----------------------------------------------------------------------

export const useCreateChurch = () => {
  return useMutation({
    mutationFn: (church: ChurchEntity.CreateChurch) => createChurch(church),
    meta: {
      successMessage: '교회 등록에 성공했어요',
      errorMessage: '교회 등록에 실패했어요',
      invalidateQueries: [CHURCH_URL.churches],
    },
  });
};

export const useUpdateChurch = () => {
  return useMutation({
    mutationFn: (church: ChurchEntity.UpdateChurch) => updateChurch(church),
    meta: {
      successMessage: '교회 수정에 성공했어요',
      errorMessage: '교회 수정에 실패했어요',
      invalidateQueries: (church: ChurchEntity.UpdateChurch) => [
        [CHURCH_URL.churches],
        [CHURCH_URL.churchById(church.id)],
      ],
    },
  });
};

export const useDeleteChurch = () => {
  return useMutation({
    mutationFn: (id: number) => deleteChurch(id),
    meta: {
      successMessage: '교회 삭제에 성공했어요',
      errorMessage: '교회 삭제에 실패했어요',
      invalidateQueries: [CHURCH_URL.churches],
    },
  });
};
