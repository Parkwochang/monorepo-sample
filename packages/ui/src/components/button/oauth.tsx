'use client';

import { type HTMLAttributes } from 'react';
import Image from 'next/image';

import { Text } from '@workspace/ui/components/text';
import { cn } from '@workspace/ui/lib';

interface LoginBtnProps extends HTMLAttributes<HTMLDivElement> {
  loginData: {
    title: string;
    logo?: string;
    style?: string;
    textStyle?: string;
  };
}

export const LoginBtn = ({ loginData, ...props }: LoginBtnProps) => {
  const { title, logo, style, textStyle } = loginData;

  return (
    <div
      className={cn(`px-[24px] flex rounded-[6px] h-[50px] items-center cursor-pointer mb-3 last:mb-0`, style)}
      {...props}
    >
      {logo && <Image src={logo} width={25} height={25} alt={title} />}
      <Text className={cn('flex-1 leading-[50px] text-center font-medium', textStyle)}>{title}</Text>
    </div>
  );
};
