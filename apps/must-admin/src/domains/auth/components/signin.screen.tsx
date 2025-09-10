import Link from 'next/link';

import { cn } from '@workspace/ui/lib';

import { LoginForm } from './signin-form';

// ----------------------------------------------------------------------

export const SigninScreen = ({ type }: { type: 'ADMIN' | 'LEADER' }) => {
  return (
    <main className="min-h-dvh w-full bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl bg-white">
        {/* Left side - Map & information */}
        <div className="w-full lg:w-5/12 relative overflow-hidden bg-[#1e40af] py-8 px-6 md:p-10">
          <div className="h-full w-full absolute top-0 left-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/bg/location.png')] bg-no-repeat bg-center bg-cover" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-4 md:mb-6">WEEPLE</h1>
              <p className="text-blue-100 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                WEEPLE의 모든 것을 관리하는 시스템입니다. <br className="hidden sm:block" />
                안전한 로그인을 통해 시스템에 접속해주세요.
              </p>
            </div>

            <div className="hidden md:block mt-auto">
              <div className="border-t border-blue-300/30 pt-4 md:pt-6">
                <div className="text-white mb-1 md:mb-2 font-medium text-lg md:text-xl">고객센터</div>
                <div className="text-white text-xl md:text-2xl font-bold">02-1234-5678</div>
                <div className="text-blue-200 mt-1 text-sm md:text-base">평일 09:00~18:00 (주말/공휴일 휴무)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full lg:w-7/12 p-6 md:p-10 lg:p-14 flex flex-col">
          {/* Login type selector */}
          <div className="flex rounded-lg overflow-hidden border mb-6 md:mb-10 self-center">
            <Link
              href="?type=LEADER"
              className={cn(
                'px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium transition-colors',
                type === 'LEADER' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50',
              )}
            >
              매니져
            </Link>
            <Link
              href="?type=ADMIN"
              className={cn(
                'px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium transition-colors',
                type === 'ADMIN' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50',
              )}
            >
              관리자
            </Link>
          </div>

          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              {type === 'ADMIN' ? 'WEEPLE 관리자 로그인' : '클라이언트 로그인'}
            </h2>
            <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">
              {type === 'ADMIN' ? '관리자 계정으로 로그인하세요' : '클라이언트 계정으로 로그인하세요'}
            </p>
          </div>

          <LoginForm type={type} />

          {type === 'LEADER' && (
            <div className="mt-6 md:mt-8 text-center">
              <p className="text-xs md:text-sm text-gray-600">
                계정이 없으신가요?{' '}
                <Link href="/sign-up" className="font-medium text-blue-600 hover:underline">
                  회원가입
                </Link>
              </p>
            </div>
          )}

          <div className="md:hidden mt-8 text-center border-t border-gray-200 pt-4">
            <div className="text-gray-600 mb-1 font-medium">고객센터</div>
            <div className="text-gray-800 text-lg font-bold">02-1234-5678</div>
            <div className="text-gray-500 mt-1 text-xs">평일 09:00~18:00 (주말/공휴일 휴무)</div>
          </div>
        </div>
      </div>
    </main>
  );
};
