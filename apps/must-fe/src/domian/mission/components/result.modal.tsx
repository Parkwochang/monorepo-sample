'use client';

import { useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@workspace/ui/components/modal';
import { Spacing } from '@workspace/ui/components/box';
import { useRouter } from 'next/navigation';
import { PATH } from '@/config/config-map';

// ------------------------------------------------------------

interface MissionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRight: boolean;
  answer: string;
}

export const MissionResultModal = ({ isOpen, onClose, isRight, answer }: MissionResultModalProps) => {
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{isRight ? '정답이에요!' : '오답이에요!'}</DrawerTitle>
            <DrawerDescription>{answer}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0"></div>

          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <Button size={'lg'} onClick={onClose}>
              다음
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const MissionDoneModal = ({ done }: { done: boolean }) => {
  const [isOpen, setIsOpen] = useState(done);
  const { replace } = useRouter();

  const handleClose = () => {
    setIsOpen(false);
    replace(PATH.home);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[300px]">
        <div className="mx-auto w-full max-w-sm">
          <DialogHeader>
            <DialogTitle>이미 참여한 적이 있어요</DialogTitle>
          </DialogHeader>
          <Spacing size={20} />
          <DialogDescription className="text-left">
            이미 참여한 적이 있어 오늘은 문제를 풀 수 없어요. 내일 다시 도전해주세요.
          </DialogDescription>
          <Spacing size={30} />
          <DialogFooter>
            {/* <Button>Submit</Button> */}
            <Button size={'lg'} onClick={handleClose}>
              확인
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
