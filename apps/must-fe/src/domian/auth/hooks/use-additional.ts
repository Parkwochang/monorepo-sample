'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';

import { useGetChurches } from '@workspace/http/must/church';

import { uesUpdateChurchMutation } from './use-mutations';

// ----------------------------------------------------------------------

export const useAdditionalChurch = () => {
  const [selectedChurch, setSelectedChurch] = useState<string | null>(null);

  const { data: churchList, isFetching } = useGetChurches({
    page: '1',
    size: '1000',
  });

  const { mutateAsync: updateChurch, isPending } = uesUpdateChurchMutation();

  const handleSelectChurch = (value: string) => {
    setSelectedChurch(value);
  };

  const handleUpdateChurch = (id: number, churchId: number) => async () => {
    const result = await updateChurch({
      id,
      churchId,
    });

    result.httpStatus < 300 && redirect('/');
  };

  return {
    handleSelectChurch,
    handleUpdateChurch,
    isPending,
    isFetching,
    churchList,
    selectedChurch,
  };
};
