'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UpdateMemberDto, type MemberEntity } from '@workspace/http/must/member';
import { useUpdateMember } from './use-mutations';
import { transformMember } from '../service/helper';

// ----------------------------------------------------------------------

export const useUpdateAdminMember = (member: MemberEntity.MemberRes) => {
  const form = useForm({
    values: transformMember(member),
    resolver: zodResolver(UpdateMemberDto),
    mode: 'onChange',
  });

  const { mutate: updateMember, isPending } = useUpdateMember();

  const onSubmit = form.handleSubmit(
    (data) => {
      updateMember(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return { form, onSubmit, isPending };
};
