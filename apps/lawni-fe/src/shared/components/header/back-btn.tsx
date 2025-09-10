'use client';

import { CustomIcon } from '@workspace/ui/components/text';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------

export const BackBtnHeader = () => {
  const { back } = useRouter();

  return (
    <header className="h-[50px] flex items-center px-4 bg-white fixed top-0 w-full max-w-[640px] justify-between z-50">
      <CustomIcon name="ChevronLeft" size={25} onClick={back} />
    </header>
  );
};
