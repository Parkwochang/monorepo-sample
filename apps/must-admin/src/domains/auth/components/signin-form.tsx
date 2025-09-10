'use client';

import { Form, FormField, FormItem, Input } from '@workspace/ui/components/form';
import { Label } from '@workspace/ui/components/label';
import { LoadingBtn } from '@workspace/ui/components/button';

import { useSignin } from '../hooks';

// ----------------------------------------------------------------------

interface LoginFormProps {
  type: 'ADMIN' | 'LEADER';
}

export function LoginForm({ type }: LoginFormProps) {
  const { form, onSubmit, isPending, isError } = useSignin(type);

  return (
    <Form {...form}>
      <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
        <input type="hidden" name="role" value={type} />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label className="text-black" htmlFor={field.name}>
                아이디
              </Label>
              <Input className="text-black" id={field.name} placeholder="아이디를 입력해주세요" {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label className="text-black" htmlFor={field.name}>
                비밀번호
              </Label>
              <Input
                className="text-black"
                id={field.name}
                placeholder="비밀번호를 입력해주세요"
                type="password"
                {...field}
              />
            </FormItem>
          )}
        />

        {isError && (
          <div className="bg-red-50 text-red-700 p-2 md:p-3 rounded-md text-xs md:text-sm">
            아이디 또는 비밀번호를 확인해주세요.
          </div>
        )}

        <LoadingBtn isLoading={isPending} type="submit" size="full">
          로그인
        </LoadingBtn>

        {/* <div className="space-y-1 md:space-y-2">
        <label htmlFor="email" className="text-xs md:text-sm font-medium text-gray-700">
          아이디
        </label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="아이디를 입력하세요"
          className="p-2 md:p-3 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-1 md:space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-xs md:text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <Link href="#" className="text-xs md:text-sm text-blue-600 hover:underline">
            비밀번호 찾기
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="p-2 md:p-3 w-full text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="h-3 w-3 md:h-4 md:w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="remember" className="text-xs md:text-sm font-medium leading-none text-gray-700">
          로그인 상태 유지
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-4 md:mt-6 py-2 md:py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium rounded-md transition-colors"
      >
        로그인
      </button> */}
      </form>
    </Form>
  );
}
