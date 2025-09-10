'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@workspace/ui/components/modal';

export function ResultModal({
  isOpen,
  onOpenChange,
  result,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  result: boolean;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>미션 결과</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {result ? '정답이에요! 포인트 획득!' : '아쉽게 실패했어요ㅠㅠ 다음 미션에서 더 잘해보세요!'}
        </DialogDescription>
        <DialogFooter className="grid grid-cols-2 gap-3">
          <Button variant={'destructive'} size={'lg'} onClick={() => onOpenChange(false)}>
            그만하기
          </Button>
          <Button size={'lg'} onClick={() => onOpenChange(false)}>
            이어하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
