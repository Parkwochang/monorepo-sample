'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useCreateCheckIn } from '@workspace/http/must/check-in/mutation';
import { fDate } from '@repo/core/format-time';
import { Text } from '@workspace/ui/components/text';
import Image from 'next/image';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';

interface CheckInScreenProps {
  memberId: number;
}

export const CheckInScreen = ({ memberId }: CheckInScreenProps) => {
  const { mutate: createCheckIn, isPending, isSuccess, isError } = useCreateCheckIn();

  const router = useRouter();

  useEffect(() => {
    createCheckIn({
      memberId,
      checkDate: fDate(new Date()),
      checkMethod: 'QR_CODE',
    });
  }, []);

  if (isPending) return <div>출석중...</div>;

  if (isError) return <CheckInErrorScreen />;

  return (
    <div className="flex-center flex-col">
      <Spacing size={80} />
      <Image src="/placeholder.png" alt="check-in-failed" width={300} height={300} />
      <Spacing size={40} />
      <Text as="p" className="text-3xl font-bold">
        출석 성공
      </Text>
      <Spacing size={20} />
      <Text as="p" className="text-xl">
        출석에 성공했어요
      </Text>
      <Text as="p" className="text-xl">
        돌아가서 미션에 참여해주세요
      </Text>

      <Button size={'lg'} onClick={() => router.push('/')}>
        홈으로 가기
      </Button>
    </div>
  );
};

export const PermissionErrorScreen = () => {
  const router = useRouter();

  return (
    <div className="flex-center flex-col">
      <Spacing size={80} />
      <Image src="/placeholder.png" alt="check-in-failed" width={300} height={300} />
      <Spacing size={40} />
      <Text as="p" className="text-3xl font-bold">
        소속된 교회가 없어요
      </Text>
      <Spacing size={20} />
      <Text as="p" className="text-xl text-gray-500">
        교회에 가입하고 이용해주세요
      </Text>

      <Spacing size={20} />
      <Button size={'lg'} onClick={() => router.push('/')}>
        교회 가입하기
      </Button>
    </div>
  );
};

export const CheckInFailedScreen = () => {
  return (
    <div className="flex-center flex-col">
      <Spacing size={80} />
      <Image src="/placeholder.png" alt="check-in-failed" width={300} height={300} />
      <Spacing size={40} />
      <Text as="p" className="text-3xl font-bold">
        출석 실패
      </Text>
      <Spacing size={20} />
      <Text as="p" className="text-xl">
        출석 시간이 지났어요
      </Text>
      <Text as="p" className="text-xl">
        출석 체크를 다시 요청해주세요
      </Text>
    </div>
  );
};

export const CheckInErrorScreen = () => {
  const router = useRouter();

  return (
    <div className="flex-center flex-col">
      <Spacing size={80} />
      <Image src="/placeholder.png" alt="check-in-failed" width={300} height={300} />
      <Spacing size={40} />
      <Text as="p" className="text-3xl font-bold">
        출석 실패
      </Text>
      <Spacing size={20} />
      <Text as="p" className="text-xl">
        오늘 이미 출석했어요
      </Text>
      <Text as="p" className="text-xl">
        내일 다시 찾아주세요
      </Text>

      <Spacing size={20} />
      <Button size={'lg'} onClick={() => router.push('/')}>
        홈으로 가기
      </Button>
    </div>
  );
};
