'use client';

import { LoadingBtn } from '@workspace/ui/components/button';
import { Form, FormField, Textarea } from '@workspace/ui/components/form';

import { useCreateComment } from '../../hooks';

// ----------------------------------------------------------------------

export const CommentForm = ({ postId }: { postId: number }) => {
  const { form, onSubmit, isPending } = useCreateComment(postId);

  return (
    <Form {...form}>
      <form className="px-5 flex flex-col gap-4 items-end" onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => <Textarea className="resize-none h-16 text-sm" {...field} />}
        />
        <LoadingBtn type="submit" isLoading={isPending} disabled={!form.formState.isValid}>
          댓글 작성
        </LoadingBtn>
      </form>
    </Form>
  );
};
