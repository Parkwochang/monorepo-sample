'use client';

import * as React from 'react';

import { Button } from '@workspace/ui/components/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@workspace/ui/components/modal';
import type { ChurchEntity } from '@workspace/http/must/church';

interface SlideModalProps {
  data: ChurchEntity.Church;
  children: React.ReactNode;
}

export function ChurchSlideModal({ data, children }: SlideModalProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        {/* <Button variant="ghost"> */}
        {children}
        {/* </Button> */}
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{data.churchName}</DrawerTitle>
            <DrawerDescription>{data.address}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0"></div>

          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button size={'lg'}>확인</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
