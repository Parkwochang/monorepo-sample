'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Spacing } from '@workspace/ui/components/box';
import { Heading } from '@workspace/ui/components/text';
import { Button } from '@workspace/ui/components/button';

import { CommunityLoading } from '@/shared/components/box';
import { DeferredLayout } from '@/shared/components/layout';
import { PATH } from '@/config/config-map';
import { useGetInfiniteCommunitiesQuery } from '../hooks';
import { CommunityBox } from './community';

export const CommunityScreen = () => {
  const {
    data: communityData,
    isFetching: isCommunityFetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCommunitiesQuery();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className="h-dvh pt-[50px] pb-[20px] overflow-auto">
      <Spacing size={20} />
      <Heading asType="h2" size={'lg'} className="font-semibold px-5">
        커뮤니티
      </Heading>
      <Spacing size={30} />
      <DeferredLayout loading={isCommunityFetching} fallback={<CommunityLoading />}>
        {communityData?.pages && <CommunityBox communityData={communityData.pages} />}
      </DeferredLayout>
      {isFetchingNextPage ? <CommunityLoading /> : <div ref={ref} />}
      <div className="absolute bottom-0 inset-x-0 px-5 py-4">
        <Button size={'lg'} className="w-full" asChild>
          <Link href={PATH.sunday.communityCreate}>게시글 작성</Link>
        </Button>
      </div>
    </main>
  );
};
