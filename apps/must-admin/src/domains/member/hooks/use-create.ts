'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateMemberDto } from '@workspace/http/must/member';

import { CREATE_MEMBER_FORM } from '@/config/form';
import { useMyInfo } from '@/shared/hooks';
import { useCreateMember } from './use-mutations';

// ----------------------------------------------------------------------

export const useCreateAdminMember = () => {
  const form = useForm({
    defaultValues: CREATE_MEMBER_FORM,
    resolver: zodResolver(CreateMemberDto),
    mode: 'onBlur',
  });

  const { mutate: createMember, isPending } = useCreateMember();

  const onSubmit = form.handleSubmit(
    (data) => {
      createMember(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return { form, onSubmit, isPending };
};

// ----------------------------------------------------------------------

export const useCreateManagerMember = () => {
  const myInfo = useMyInfo();

  const form = useForm({
    defaultValues: {
      ...CREATE_MEMBER_FORM,
      churchId: myInfo.churchId,
    },
    resolver: zodResolver(CreateMemberDto),
    mode: 'onChange',
  });

  const { mutate: createMember, isPending } = useCreateMember();

  const onSubmit = form.handleSubmit(
    (data) => {
      createMember(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return { form, onSubmit, isPending };
};
