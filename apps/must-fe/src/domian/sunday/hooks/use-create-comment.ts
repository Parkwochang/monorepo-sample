'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateBoardCommentDto } from '@workspace/http/must/board';

import { useCreateCommentMutation } from './use-mutations';

// ----------------------------------------------------------------------

export const useCreateComment = (postId: number) => {
  const form = useForm({
    defaultValues: {
      content: '',
      postId,
    },
    resolver: zodResolver(CreateBoardCommentDto),
    mode: 'onChange',
  });

  const { mutateAsync: createComment, isPending } = useCreateCommentMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    await createComment(data);
    form.reset();
  });

  return { form, onSubmit, isPending };
};
