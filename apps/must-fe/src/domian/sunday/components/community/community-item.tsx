'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import type { BoardEntity } from '@workspace/http/must/board';
import { Spacing } from '@workspace/ui/components/box';
import { Text } from '@workspace/ui/components/text';

import { PATH } from '@/config/config-map';
import { fToNow } from '@/lib/helpers';

// ----------------------------------------------------------------------

export const CommunityItem = ({ data }: { data: BoardEntity.BoardResponse }) => {
  const { title, content, imageUrl, createdByName, id } = data;

  const { push } = useRouter();

  const handleClick = () => {
    push(PATH.sunday.communityDetail(id));
  };

  return (
    <div
      className="px-2 py-4 border-b last:border-b-0 active:bg-gray-100 active:rounded-lg cursor-pointer transition-all duration-150 ease-in-out"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <div className="size-6 rounded-full bg-gray-200" />
        <Text size={'sm'} className="font-medium text-gray-500">
          {createdByName}
        </Text>
        <Text size={'sm'} className="text-gray-500">
          {fToNow(data.createdAt)}
        </Text>
      </div>
      <Spacing size={5} />
      {imageUrl ? (
        <CommunityImageItem title={title} content={content} imageUrl={imageUrl} />
      ) : (
        <CommunityTextItem title={title} content={content} />
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

function CommunityImageItem({ title, content, imageUrl }: { title: string; content: string; imageUrl: string }) {
  return (
    <div className="flex justify-between gap-2">
      <div className="flex-1 flex flex-col gap-2">
        <Text as="p" size={'lg'} className="font-semibold text-nowrap line-clamp-1 text-ellipsis">
          {title}
        </Text>
        <Text className="text-gray-500 text-wrap line-clamp-2 text-ellipsis flex-1">{content}</Text>
      </div>

      <div className="size-16 rounded-md relative overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------

function CommunityTextItem({ title, content }: { title: string; content: string }) {
  return (
    <div className="flex flex-col justify-between gap-2">
      <Text as="p" size={'lg'} className="font-semibold text-wrap line-clamp-2 text-ellipsis flex-1">
        {title}
      </Text>

      <Text size={'sm'} className="text-gray-500 text-wrap line-clamp-3 text-ellipsis flex-1">
        {content}
      </Text>
    </div>
  );
}
