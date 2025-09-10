import { SignInScreen } from '@/domian/auth/components/screen';

interface Props {
  searchParams: Promise<{
    type: 'email';
  }>;
}

export default async function SignInPage({ searchParams }: Props) {
  const { type } = await searchParams;

  return <SignInScreen type={type} />;
}
