'use client';

import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';
import type { ChurchEntity } from '@workspace/http/must/church';
import { DatePickerForm } from '@workspace/ui/components/calendar';

import { ContentFormLayout, ScreenFormLayout } from '@/shared/components/layout';
import { ImageUpload } from '@/shared/components/ui';
import { useUpdateAdminChurch } from '../hooks';

interface ChurchAdminFormProps {
  church: ChurchEntity.Church;
}

export const ChurchAdminForm = ({ church }: ChurchAdminFormProps) => {
  const { form, onSubmit, isPending } = useUpdateAdminChurch(church);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ScreenFormLayout title="교회 등록" type="update" isPending={isPending}>
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

            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>위도</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>경도</FormLabel>
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
