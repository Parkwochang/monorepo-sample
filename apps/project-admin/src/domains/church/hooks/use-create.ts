'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateChurchDto } from '@workspace/http/must/church/dto';
import { useCreateChurch } from '@workspace/http/must/church/mutation';

import { CREATE_CHURCH_FORM } from '@/config/form';

// ----------------------------------------------------------------------

export const useCreateAdminChurch = () => {
  const form = useForm({
    defaultValues: CREATE_CHURCH_FORM,
    resolver: zodResolver(CreateChurchDto),
    mode: 'onChange',
  });

  const { mutate: createChurch, isPending } = useCreateChurch();

  const onSubmit = form.handleSubmit(
    (data) => {
      createChurch(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return { form, onSubmit, isPending };
};
