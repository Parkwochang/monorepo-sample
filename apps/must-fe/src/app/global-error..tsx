'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// package
import { updatePageLog } from '@repo/utils';

// ----------------------------------------------------------------------

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  const { push, refresh } = useRouter();

  useEffect(() => {
    console.log('Error object:', error);
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Error cause:', error.cause);
    console.log('Error constructor:', error.constructor.name);
    console.log('Is UserException:', error.constructor.name === 'UserException');
    // updatePageLog({
    //   origin: window.location.href,
    //   name: error.name ?? 'Screen Error',
    //   message: error.message ?? '',
    //   cause: error.cause ?? '',
    //   stack: error.stack ?? '',
    // });
  }, [error]);

  return (
    <main className="h-dvh grid place-items-center">
      <div className="text-center leading-normal flex flex-col gap-3">
        {/* <Image src='/like-logo.png' alt='404' width={400} height={400} loading='lazy' /> */}
        <p className="text-[80px]">{error.name}</p>
        <p className="text-xl">요청하신 작업을 수행하지 못했습니다.</p>
        <p className="text-[#939393] font-medium">일시적 현상이니 잠시 후 다시 시도해 주세요.</p>
        <div className="flex justify-center mt-5 gap-4">
          <button
            onClick={() => push('/')}
            className="w-[200px] h-[60px] flex-center bg-primary text-white rounded-[12px] font-bold cursor-pointer"
          >
            메인페이지로 돌아가기
          </button>
        </div>
      </div>
    </main>
  );
}
