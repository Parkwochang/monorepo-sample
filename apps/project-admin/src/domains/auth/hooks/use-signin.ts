'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDto } from '@workspace/http/must/auth';
import { useLogin } from './use-mutations';

// ----------------------------------------------------------------------

export const useSignin = (type: 'ADMIN' | 'LEADER') => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      role: type,
    },
    resolver: zodResolver(LoginDto),
  });

  const { mutate: login, isPending, isError } = useLogin();

  const onSubmit = form.handleSubmit((data) => {
    login(data);
  });

  return {
    form,
    onSubmit,
    isPending,
    isError,
  };
};
