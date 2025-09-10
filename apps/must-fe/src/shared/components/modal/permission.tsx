'use client';

import { useEffect, useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/modal';
import { Text } from '@workspace/ui/components/text';

import { useGetMemberQuery } from '@/domian/auth/hooks';
import Link from 'next/link';

// ----------------------------------------------------------------------

export const PermissionModal = ({ churchId }: { churchId?: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!churchId) {
      setIsOpen(true);
    }
  }, [churchId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>교회 정보가 없어요</DialogTitle>
        </DialogHeader>

        <Text className="py-5 px-3">원활한 서비스 이용을 위해 교회 정보를 추가해주세요</Text>

        <DialogFooter>
          <DialogClose className="font-medium text-gray-500">다음에 하기</DialogClose>
          <Button size={'lg'} asChild>
            <Link href={'/additional-info'} prefetch={false}>
              교회 추가하기
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
