'use client';

import { useRouter } from 'next/navigation';

import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { Heading } from '@workspace/ui/components/text';

// ----------------------------------------------------------------------

interface ScreenFormLayoutProps {
  title: string;
  children: React.ReactNode;
  isPending?: boolean;
  type?: 'create' | 'update';
}

export const ScreenFormLayout = ({ title, children, isPending, type = 'create' }: ScreenFormLayoutProps) => {
  const router = useRouter();

  return (
    <div>
      <Heading asType="h2">{title}</Heading>
      <div className="mt-[calc(var(--spacing)*6)] grid grid-cols-1 md:grid-cols-2 gap-[calc(var(--spacing)*6)]">
        {children}
      </div>
      <div className="mt-[calc(var(--spacing)*6)] flex justify-end gap-[calc(var(--spacing)*3)]">
        <Button type="button" variant="secondary" size={'lg'} onClick={() => router.back()}>
          취소
        </Button>
        <LoadingBtn type="submit" size={'lg'} isLoading={isPending}>
          {type === 'create' ? '저장' : '수정'}
        </LoadingBtn>
      </div>
    </div>
  );
};
