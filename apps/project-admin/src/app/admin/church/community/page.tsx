import { type BoardEntity } from '@workspace/http/must/board';

import { CommunityScreen } from '@/domains/member/components';

interface ChurchCommunityPageProps {
  searchParams: Promise<BoardEntity.BoardParams>;
}

export default async function ChurchCommunityPage({ searchParams }: ChurchCommunityPageProps) {
  const { page = '1', size = '20', ...rest } = await searchParams;

  return <CommunityScreen filters={{ page, size, ...rest }} />;
}
