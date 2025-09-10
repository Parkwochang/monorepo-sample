import { BackBtnHeader } from '@/shared/components/header';

export default function CheckInLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackBtnHeader />
      <main className="h-dvh pt-[50px] p-3">{children}</main>
    </>
  );
}
