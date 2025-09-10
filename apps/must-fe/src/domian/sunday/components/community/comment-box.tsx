'use client';

import { BoardCommentEntity } from '@workspace/http/must/board';
import { Text } from '@workspace/ui/components/text';

import { fDate } from '@/lib/helpers';
import { useGetCommentsQuery } from '../../hooks';

// ----------------------------------------------------------------------

export const CommentBox = ({ postId }: { postId: number }) => {
  const { data, isPending } = useGetCommentsQuery({ postId, page: '0', size: '100' });

  return (
    <article className="px-5 ">
      <Text as="p" size={'lg'} className="font-semibold mb-4">
        {data?.content.length}개의 댓글
      </Text>
      {data?.content.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
    </article>
  );
};

function CommentItem({ comment }: { comment: BoardCommentEntity.BoardCommentResponse }) {
  return (
    <div className="py-3 border-b last:border-b-0">
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-full bg-gray-200" />
        <div className="flex flex-col">
          <Text className="font-medium">{comment.createdByName}</Text>
          <Text size={'sm'} className="text-gray-500">
            {fDate(comment.createdAt, 'PPP p')}
          </Text>
        </div>
      </div>

      <Text as="p" className="mt-5 whitespace-pre-wrap">
        {comment.content}
      </Text>
    </div>
  );
}
