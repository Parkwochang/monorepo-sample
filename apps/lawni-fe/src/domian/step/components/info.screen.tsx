import { CategoryEntity } from '@workspace/http/lawni/category';
import { Spacing } from '@workspace/ui/components/box';

import { ProcessStepper } from './process-stepper';
import { InfoForm } from './info-form';

interface InfoScreenProps {
  categoryDetail: CategoryEntity.CategoryDetailRes[];
  step?: string;
  code: string;
}

export const InfoScreen = ({ categoryDetail, step = '2', code }: InfoScreenProps) => {
  return (
    <main className="h-dvh px-5">
      <Spacing size={30} />

      <ProcessStepper step={Number(step)} totalStep={5} />

      <Spacing size={20} />

      <InfoForm categoryDetail={categoryDetail} code={code} />
    </main>
  );
};
