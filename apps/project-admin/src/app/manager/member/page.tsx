import { MemberScreen } from '@/domains/member/components';
import { MemberEntity } from '@workspace/http/must/member';

interface MemberPageProps {
  searchParams: Promise<MemberEntity.MemberParams>;
}

export default async function ManagerMemberPage({ searchParams }: MemberPageProps) {
  const filters = await searchParams;

  return <MemberScreen filters={filters} />;
}
