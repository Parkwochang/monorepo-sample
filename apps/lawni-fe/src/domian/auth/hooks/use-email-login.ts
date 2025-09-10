'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginDto } from '@workspace/http/lawni/auth';

import { useLoginMutation } from './use-mutations';

// ----------------------------------------------------------------------

export const useEmailLogin = () => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(LoginDto),
  });

  const { mutateAsync: login, isPending, isError } = useLoginMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    const result = await login(data);
  });

  return {
    form,
    onSubmit,
    isPending,
    isError,
  };
};
