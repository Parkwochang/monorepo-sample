'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { push } = useRouter();

  return (
    <main className="h-dvh grid place-items-center">
      <div className="text-center leading-normal flex flex-col gap-3">
        {/* <Image src='/like-logo.png' alt='404' width={400} height={400} loading='lazy' /> */}
        <p className="text-[80px]">404</p>
        <p className="text-xl">요청하신 페이지를 찾을 수 없습니다.</p>
        <p className="text-[#939393] font-medium">페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</p>
        <div className="flex justify-center mt-5">
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

// const headersList = headers();
// const domain = headersList.get('host');
// const proto = headersList.get('X-Forwarded-Proto');
// href={`${proto}://${domain}`}
