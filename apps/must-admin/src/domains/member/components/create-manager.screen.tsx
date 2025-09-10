'use client';

import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';
import { DatePickerForm } from '@workspace/ui/components/calendar';

import { ContentFormLayout } from '@/shared/components/layout/content-form.layout';
import { ScreenFormLayout } from '@/shared/components/layout';
import { ImageUpload } from '@/shared/components/ui';
import { FormSelect } from '@/components/box';
import { MANAGER_ROLE_MAP } from '@/config/config-map';
import { useCreateManagerMember } from '../hooks';

// ----------------------------------------------------------------------

export const MemberCreateManagerScreen = () => {
  const { form, onSubmit, isPending } = useCreateManagerMember();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ScreenFormLayout title="회원 등록" isPending={isPending}>
          {/* 계정 정보 */}
          <ContentFormLayout title="계정 정보">
            <FormField
              control={form.control}
              name="email"
              rules={{
                onChange(event) {
                  form.setValue('username', event.target.value);
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>이메일</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>비밀번호</FormLabel>
                  <Input className="py-2 px-3" type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>휴대폰</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </ContentFormLayout>

          {/* 프로필 이미지 */}
          <ContentFormLayout title="프로필 이미지">
            <ImageUpload fieldName="profileImageUrl" form={form} />
          </ContentFormLayout>

          {/* 회원 정보 */}
          <ContentFormLayout title="회원 정보">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>이름</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="englishName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>영문이름</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DatePickerForm fieldName="birthDate" label="생년월일" />

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

          {/* 권한 정보 */}
          <ContentFormLayout title="권한 정보">
            <div className="grid grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel htmlFor={field.name}>회원 역할</FormLabel>
                    <FormSelect
                      placeholder="역할을 선택해주세요"
                      className="w-full"
                      filterCondition={
                        Object.entries(MANAGER_ROLE_MAP).map(([key, value]) => ({
                          label: value,
                          value: key,
                        })) ?? []
                      }
                      onChange={field.onChange}
                      value={field.value ?? ''}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ContentFormLayout>
        </ScreenFormLayout>
      </form>
    </Form>
  );
};
