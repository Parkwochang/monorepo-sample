'use client';

import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';
import { DatePickerForm } from '@workspace/ui/components/calendar';

import { ContentFormLayout } from '@/shared/components/layout/content-form.layout';
import { ScreenFormLayout } from '@/shared/components/layout';
import { ImageUpload } from '@/shared/components/ui';
import { useCreateAdminChurch } from '../hooks';

// ----------------------------------------------------------------------

export const ChurchCreateScreen = () => {
  const { form, onSubmit, isPending } = useCreateAdminChurch();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ScreenFormLayout title="교회 등록" isPending={isPending}>
          {/* 계정 정보 */}
          <ContentFormLayout title="교회 정보">
            <FormField
              control={form.control}
              name="churchName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>교회 이름</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pastorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>대표 목사</FormLabel>
                  <Input className="py-2 px-3" type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>주소</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </ContentFormLayout>

          {/* 프로필 이미지 */}
          <ContentFormLayout title="교회 이미지">
            <ImageUpload fieldName="profileImageUrl" form={form} />
          </ContentFormLayout>

          {/* 회원 정보 */}
          <ContentFormLayout title="추가 정보">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>전화번호</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>이메일</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DatePickerForm fieldName="establishedDate" label="설립일" />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>웹사이트</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </ContentFormLayout>
        </ScreenFormLayout>
      </form>
    </Form>
  );
};
