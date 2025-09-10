import { BackBtnHeader } from '@/shared/components/header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BackBtnHeader />
      <main className="px-3 pt-[50px] h-dvh">{children}</main>
    </>
  );
}
