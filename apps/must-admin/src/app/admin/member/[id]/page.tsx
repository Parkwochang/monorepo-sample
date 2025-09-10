import { MemberUpdateScreen } from '@/domains/member/components';

export default async function AdminMemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <MemberUpdateScreen id={Number(id)} />;
}
