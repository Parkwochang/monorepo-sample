import { CategoryScreen, InfoScreen } from '@/domian/step/components';
import { getCategoryDetailServer, getCategoryListServer } from '@/domian/step/service';

interface StepPageProps {
  searchParams: Promise<{
    step?: string;
    categoryId?: string;
    code?: string;
  }>;
}

export default async function StepPage({ searchParams }: StepPageProps) {
  const { step, categoryId, code } = await searchParams;

  if (categoryId && code) {
    const categoryDetail = await getCategoryDetailServer(categoryId);
    return <InfoScreen categoryDetail={categoryDetail} code={code} step={step} />;
  }

  const categoryList = await getCategoryListServer();

  return <CategoryScreen categoryList={categoryList} step={step} />;
}
