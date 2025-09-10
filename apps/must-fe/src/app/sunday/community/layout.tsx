import { BackBtnHeader } from '@/shared/components/header';

export default function SundayCommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackBtnHeader />
      {children}
    </>
  );
}
