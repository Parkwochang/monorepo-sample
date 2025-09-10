import { Spacing } from '@workspace/ui/components/box';

import { ProcessStepper } from '@/domian/step/components/process-stepper';
import { FileLoadingLayout } from '@/shared/components/layout';
import { OutcomeForm } from './outcome.form';

// ----------------------------------------------------------------------

export const ChatOutcomeScreen = () => {
  return (
    <main className="h-dvh px-5">
      <Spacing size={30} />

      <ProcessStepper step={4} totalStep={5} />

      <Spacing size={20} />

      <OutcomeForm />

      <FileLoadingLayout />
    </main>
  );
};
