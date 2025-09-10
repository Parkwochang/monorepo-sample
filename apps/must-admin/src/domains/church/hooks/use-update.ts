'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UpdateChurchDto, type ChurchEntity } from '@workspace/http/must/church';
import { useUpdateChurch } from './use-mutations';

// ----------------------------------------------------------------------

export const useUpdateAdminChurch = (church: ChurchEntity.Church) => {
  const form = useForm({
    values: church,
    resolver: zodResolver(UpdateChurchDto),
    mode: 'onChange',
  });

  const { mutate: updateChurch, isPending } = useUpdateChurch();

  const onSubmit = form.handleSubmit(
    (data) => {
      updateChurch(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return { form, onSubmit, isPending };
};
