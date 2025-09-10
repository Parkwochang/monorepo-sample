import { SigninScreen } from '@/domains/auth/components';

// ----------------------------------------------------------------------

interface LoginPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const type = (await searchParams)?.type === 'LEADER' ? 'LEADER' : 'ADMIN';

  return <SigninScreen type={type} />;
}
