import { Spacing } from '@workspace/ui/components/box';

import { NavFooter } from '@/shared/components/footer';
import { NavHeader } from '@/shared/components/header';
import { ChallengeInfo } from './challenge-info';
import { MyInfo } from './my-info';
import { MainRanking } from './ranking';

interface MainScreenProps {
  bible: {
    content: string;
    volume: string;
    sheet: string;
    verse: string;
  };
}

export const MainScreen = ({ bible }: MainScreenProps) => {
  return (
    <>
      <NavHeader />

      <main className="pt-[50px] py-[200px] ">
        <MyInfo bible={bible} />
        <Spacing size={50} />
        <ChallengeInfo />
        <Spacing size={50} />
        <MainRanking />
      </main>

      <NavFooter />
    </>
  );
};
