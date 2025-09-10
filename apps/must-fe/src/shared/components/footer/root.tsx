'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChurchIcon, HomeIcon, MenuIcon, MissionIcon } from './icon';

// ----------------------------------------------------------------------

const Color = {
  dark: {
    defailt: '_d',
    active: '_d_a',
  },
  light: {
    defailt: '#d1d6dc',
    active: '#333',
  },
};

const Footer = [
  {
    name: '홈',
    IconComponent: HomeIcon,
    path: '/',
  },
  {
    name: 'book',
    IconComponent: MissionIcon,
    path: '/mission',
  },
  {
    name: '교회',
    IconComponent: ChurchIcon,
    path: '/sunday',
  },
  {
    name: '전체',
    IconComponent: MenuIcon,
    path: '/my',
  },
];

export const NavFooter = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  return (
    <footer className="h-[70px] rounded-t-2xl bg-background fixed bottom-0 w-full max-w-[640px] border py-2 px-8 flex items-start justify-between">
      {Footer.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          className="size-10 flex-center rounded-md active:bg-gray-200 cursor-pointer"
        >
          <item.IconComponent
            className={'size-[30px]'}
            fill={pathname === item.path ? Color[theme].active : Color[theme].defailt}
          />
          {/* <Image
            src={pathname === item.path ? item.icon(Color[theme].active) : item.icon(Color[theme].defailt)}
            width={30}
            height={30}
            // className="size-[30px]"
            alt={item.name}
          /> */}
        </Link>
      ))}
    </footer>
  );
};
