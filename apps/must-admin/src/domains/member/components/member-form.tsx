'use client';

import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';
import { useGetChurches } from '@workspace/http/must/church';
import type { MemberEntity } from '@workspace/http/must/member';
import { DatePickerForm } from '@workspace/ui/components/calendar';

import { ContentFormLayout, ScreenFormLayout } from '@/shared/components/layout';
import { ImageUpload } from '@/shared/components/ui';
import { FormSelect } from '@/components/box';
import { ROLE_MAP } from '@/config/config-map';
import { objToSelectObj } from '@/lib/utils';
import { useUpdateAdminMember } from '../hooks';

interface MemberAdminFormProps {
  member: MemberEntity.MemberRes;
}

export const MemberAdminForm = ({ member }: MemberAdminFormProps) => {
  const { form, onSubmit, isPending } = useUpdateAdminMember(member);

  const { data: churches } = useGetChurches({ page: '0', size: '1000' });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <ScreenFormLayout title="회원 수정" isPending={isPending} type="update">
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
                        Object.entries(ROLE_MAP).map(([key, value]) => ({
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

              <FormField
                control={form.control}
                name="churchId"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel htmlFor={field.name}>소속 교회</FormLabel>
                    <FormSelect
                      placeholder="교회를 선택해주세요."
                      className="w-full"
                      filterCondition={
                        churches?.content ? objToSelectObj(churches?.content, { label: 'churchName', value: 'id' }) : []
                      }
                      onChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString() ?? ''}
                    />
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
