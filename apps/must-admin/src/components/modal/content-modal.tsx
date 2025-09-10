'use client';

import { cn } from '@workspace/ui/lib';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/modal';

interface DefaultModalProps extends React.HTMLAttributes<HTMLDivElement> {
  btnName?: string;
  title: string;
  desc?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  button?: React.ReactNode;
}

export const ContentModal = ({
  btnName,
  title,
  desc,
  open,
  setOpen,
  children,
  button,
  className,
  ...props
}: DefaultModalProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{button && button}</DialogTrigger>
      <DialogContent className={cn('sm:max-w-[425px] p-10', className)} {...props}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription>{desc}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
