import { WithdrawScreen } from '@/domains/member/components';
import { type WithdrawalEntity } from '@workspace/http/must/withdrawal';

interface WithdrawalAdminPageProps {
  searchParams: Promise<WithdrawalEntity.WithdrawalParams>;
}

export default async function WithdrawalAdminPage({ searchParams }: WithdrawalAdminPageProps) {
  const { page = '1', size = '20', ...rest } = await searchParams;

  return <WithdrawScreen filters={{ page, size, ...rest }} />;
}
