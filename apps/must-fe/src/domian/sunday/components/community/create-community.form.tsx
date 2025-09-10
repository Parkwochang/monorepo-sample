'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  SingleImageUpload,
  Switch,
  Textarea,
} from '@workspace/ui/components/form';
import { LoadingBtn } from '@workspace/ui/components/button';
import { CreateBoardDto } from '@workspace/http/must/board';
import { Spacing } from '@workspace/ui/components/box';

import { FormSelect } from '@/shared/components/box';
import { BOARD_CATEGORY_MAP } from '@/config/config-map';
import { COMMUNITY_FORM } from '@/config/form';
import { useCreateBoardMutation } from '../../hooks';
import { uploadImage } from '@/lib/helpers';

// ----------------------------------------------------------------------

export const CreateCommunityForm = ({ churchId }: { churchId: number }) => {
  const form = useForm({
    defaultValues: { ...COMMUNITY_FORM, churchId },
    resolver: zodResolver(CreateBoardDto),
    mode: 'onChange',
  });

  const { mutate: createBoard, isPending } = useCreateBoardMutation();

  const onSubmit = form.handleSubmit((data) => {
    createBoard(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>제목</FormLabel>
              <Input className="py-2 px-3" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>내용</FormLabel>
              <Textarea className="py-2 px-3" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>카테고리</FormLabel>
              <FormSelect
                filterCondition={Object.entries(BOARD_CATEGORY_MAP).map(([key, value]) => ({
                  label: value,
                  value: key,
                }))}
                className="w-full"
                placeholder="카테고리를 선택해주세요"
                onChange={field.onChange}
                value={field.value ?? ''}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>이미지</FormLabel>
              <SingleImageUpload
                value={field.value}
                onChange={(file) => {
                  uploadImage(file).then((res) => {
                    res?.url && field.onChange(res.url);
                  });
                }}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 justify-end">
              <FormLabel htmlFor={field.name}>활성화 여부</FormLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 justify-end">
              <FormLabel htmlFor={field.name}>공개여부</FormLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isNotice"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 justify-end">
              <FormLabel htmlFor={field.name}>공지사항여부</FormLabel>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormItem>
          )}
        />

        <Spacing size={20} />
        <LoadingBtn size={'lg'} isLoading={isPending} disabled={!form.formState.isValid} type="submit">
          게시글 등록
        </LoadingBtn>
      </form>
    </Form>
  );
};
