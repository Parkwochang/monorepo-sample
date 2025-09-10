import { MemberUpdateScreen } from '@/domains/member/components';

export default async function ManagerMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <MemberUpdateScreen id={Number(id)} />;
}
