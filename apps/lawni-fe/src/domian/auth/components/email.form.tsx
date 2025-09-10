'use client';

import { Label } from '@workspace/ui/components/label';
import { Form, FormField, FormItem, FormMessage, Input } from '@workspace/ui/components/form';
import { LoadingBtn } from '@workspace/ui/components/button';

import { useEmailLogin } from '../hooks';
import { Text } from '@workspace/ui/components/text';

// ----------------------------------------------------------------------

export const EmailLoginForm = () => {
  const { form, onSubmit, isPending, isError } = useEmailLogin();

  return (
    <div className="flex h-[calc(100%-44px)] w-full flex-col p-5">
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-4">
          {isError && (
            <Text className="text-red-500 p-3 border border-red-500 rounded-md bg-red-50">
              아이디와 비밀번호를 확인해주세요.
            </Text>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={field.name}>아이디</Label>
                <Input id={field.name} placeholder="아이디를 입력해주세요" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={field.name}>비밀번호</Label>
                <Input id={field.name} placeholder="비밀번호를 입력해주세요" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingBtn isLoading={isPending} type="submit" size={'full'}>
            로그인
          </LoadingBtn>
        </form>
      </Form>
    </div>
  );
};
