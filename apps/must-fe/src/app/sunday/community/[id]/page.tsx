import Image from 'next/image';

import { Heading, Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';

import { CommentBox, CommentForm } from '@/domian/sunday/components/community';
import { getServerBoardById } from '@/domian/sunday/service';
import { fToNow } from '@/lib/helpers';

interface SundayCommunityDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function SundayCommunityDetailPage({ params }: SundayCommunityDetailPageProps) {
  const { id } = await params;

  const data = await getServerBoardById(+id);

  return (
    <main className="h-dvh pt-[50px] pb-[20px]">
      <Spacing size={20} />

      <Heading asType="h2" size={'lg'} className="font-semibold px-5">
        {data.title}
      </Heading>

      <Spacing size={5} />

      <div className="flex items-center gap-2 px-5">
        <div className="size-6 rounded-full bg-gray-200" />
        <Text size={'sm'} className="font-medium text-gray-500">
          {data.createdByName}
        </Text>
        <Text size={'sm'} className="text-gray-500">
          {fToNow(data.createdAt)}
        </Text>
      </div>

      <Spacing size={30} />

      {data.imageUrl && (
        <div className="px-5">
          <div className="relative h-[200px]">
            <Image src={data.imageUrl} alt={data.title} fill className="object-cover" />
          </div>
          <Spacing size={30} />
        </div>
      )}

      <Text as="p" className="px-5 whitespace-pre-wrap">
        {data.content}
      </Text>

      <Spacing size={70} />

      <CommentBox postId={+id} />

      <Spacing size={30} />

      <CommentForm postId={+id} />
      <Spacing size={30} />
    </main>
  );
}
