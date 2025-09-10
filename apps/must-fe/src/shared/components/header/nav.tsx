import Image from 'next/image';

import { CustomIcon } from '@workspace/ui/components/text';

export const NavHeader = () => {
  return (
    <header className="h-[50px] flex items-center px-4 bg-[#F3F2F6]/50 backdrop-blur-sm fixed top-0 w-full max-w-[640px] justify-between z-50">
      <h1 className="text-2xl tracking-wide font-semibold hidden">WEEPLE</h1>
      <Image src="/icon/weeple_light.svg" alt="logo" width={100} height={50} />
      <div className="flex items-center gap-2">
        <div className="size-10 flex-center">
          <CustomIcon name="Bell" size={25} />
        </div>
        {/* <div className="size-10 flex-center">
          <CustomIcon name="Settings" size={25} />
        </div> */}
      </div>
    </header>
  );
};
