import { CheckScreen } from '@/domian/chat/components';

interface ChatPageProps {
  searchParams: Promise<{
    code: string;
  }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const { code } = await searchParams;

  return <CheckScreen code={code} />;
}
