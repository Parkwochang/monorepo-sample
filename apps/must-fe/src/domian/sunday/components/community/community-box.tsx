'use client';

import { type BoardEntity } from '@workspace/http/must/board';
import { Text } from '@workspace/ui/components/text';

import { CommunityItem } from './community-item';

// ----------------------------------------------------------------------

export const CommunityBox = ({ communityData }: { communityData?: BoardEntity.BoardResponse[] }) => {
  if (!communityData?.length)
    return (
      <Text as="p" size={'lg'} className="text-gray-500 px-5 py-3 text-center">
        등록된 게시글이 없어요
      </Text>
    );

  return (
    <article className="px-5">
      <div className="flex flex-col gap-3 rounded-lg shadow-sm p-3 bg-white">
        {communityData?.map((item) => <CommunityItem key={item.title} data={item} />)}
      </div>
    </article>
  );
};
