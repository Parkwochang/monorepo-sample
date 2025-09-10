'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useChangeTheme } from '@/shared/hooks';

export const LogoTitle = () => {
  const [isDark] = useChangeTheme();
  return (
    <Link href="/" className="w-full">
      <Image src={isDark ? '/icon/weeple_dark.svg' : '/icon/weeple_light.svg'} alt="logo" width={130} height={40} />
    </Link>
  );
};
