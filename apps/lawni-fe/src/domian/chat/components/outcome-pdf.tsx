'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { Text } from '@workspace/ui/components/text';

// ----------------------------------------------------------------------

export const OutcomePdf = ({ pdfUrl, progress }: { pdfUrl?: string; progress: number }) => {
  if (progress && pdfUrl) return <OutcomePdfLoading pdfUrl={pdfUrl} />;

  return <OutcomePdfDownload />;
};

// ----------------------------------------------------------------------

const OutcomePdfDownload = () => {
  return (
    <div className="bg-white rounded-lg px-5 py-3 shadow-md">
      <div className="flex-center flex-col gap-1">
        <Text className="text-blue-900">PDF 문서 생성</Text>
        <Text size={'sm'} className="text-blue-500">
          문서 내용을 PDF 파일로 생성 후 다운로드 해드릴게요
        </Text>
      </div>
      <Spacing size={10} />
      <Button type="submit" size={'lg'} className="w-full">
        PDF 생성하기
      </Button>
    </div>
  );
};

const OutcomePdfLoading = ({ pdfUrl }: { pdfUrl: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        }

        clearInterval(interval);
        return prevProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (progress === 100) return <OutcomePdfSuccess pdfData={pdfUrl} />;

  return (
    <div className="bg-white rounded-lg px-5 py-3 shadow-md">
      <div className="flex gap-2 items-center">
        <div className="w-5 h-5 border-3 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        <Text size={'lg'} className="text-blue-900">
          PDF 생성 중...
        </Text>
      </div>
      <Spacing size={20} />
      <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>
      <Spacing size={10} />
      <Text as="p" size={'sm'} className="text-gray-500 text-center">
        {progress}% 완료
      </Text>
    </div>
  );
};

const OutcomePdfSuccess = ({ pdfData }: { pdfData: string }) => {
  return (
    <div className="bg-white rounded-lg px-5 py-3 shadow-md">
      <div className="flex-center flex-col gap-1">
        <Text className="text-green-800">PDF 생성 완료</Text>
        <Text size={'sm'} className="text-green-500">
          문서가 성공적으로 생성되었어요
        </Text>
      </div>
      <Spacing size={10} />
      <Button type="submit" size={'lg'} className="w-full" asChild>
        <Link href={pdfData} download>
          PDF 다운로드
        </Link>
      </Button>
    </div>
  );
};
