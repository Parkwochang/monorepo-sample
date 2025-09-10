import { MemberScreen } from '@/domains/member/components';
import { MemberEntity } from '@workspace/http/must/member';

interface MemberPageProps {
  searchParams: Promise<MemberEntity.MemberParams>;
}

export default async function MemberPage({ searchParams }: MemberPageProps) {
  const { page = '1', size = '20', ...rest } = await searchParams;

  return <MemberScreen filters={{ page, size, ...rest }} />;
}
