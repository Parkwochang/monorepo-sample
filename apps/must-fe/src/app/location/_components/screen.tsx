import { BackBtnHeader } from '@/shared/components/header';
import { MapScreen } from './map';

export const LocationScreen = () => {
  return (
    <>
      <BackBtnHeader />
      <main className="must-container h-dvh w-dvw">
        <MapScreen />
      </main>
    </>
  );
};
