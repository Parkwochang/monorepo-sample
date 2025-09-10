'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';
import { type MemberEntity, UpdateMemberDto } from '@workspace/http/must/member';
import { DatePickerForm } from '@workspace/ui/components/calendar';
import { LoadingBtn } from '@workspace/ui/components/button';
import { Spacing } from '@workspace/ui/components/box';

import { ProfileImageUploadForm } from './image-upload.form';
import { useUpdateMemberMutation } from '../../hooks';
import { convertMember } from '../../service';
import { toast } from '@workspace/ui/components/modal';

// ----------------------------------------------------------------------

export const ProfileForm = ({ myProfile }: { myProfile: MemberEntity.MemberRes }) => {
  const form = useForm({
    values: convertMember(myProfile),
    resolver: zodResolver(UpdateMemberDto),
    mode: 'onChange',
  });

  const { mutate: updateMember, isPending } = useUpdateMemberMutation();

  const onSubmit = form.handleSubmit((data) => {
    updateMember(data);
    toast.success('회원 정보를 수정했어요');
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="profileImageUrl"
          render={({ field }) => (
            <ProfileImageUploadForm initialPreviewUrl={field.value || undefined} onChange={field.onChange} />
          )}
        />

        <Spacing size={30} />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>닉네임</FormLabel>
              <Input className="py-2 px-3" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Spacing size={20} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>이메일</FormLabel>
              <Input className="py-2 px-3" {...field} disabled />
              <FormMessage />
            </FormItem>
          )}
        />
        <Spacing size={20} />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>휴대폰 번호</FormLabel>
              <Input className="py-2 px-3" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Spacing size={20} />

        <DatePickerForm fieldName="birthDate" label="생년월일" className="w-full" />
        <Spacing size={20} />

        <div className="absolute bottom-8 inset-x-0 px-5">
          <LoadingBtn size={'xl'} className="w-full " isLoading={isPending} disabled={!form.formState.isValid}>
            수정하기
          </LoadingBtn>
        </div>
      </form>
    </Form>
  );
};
