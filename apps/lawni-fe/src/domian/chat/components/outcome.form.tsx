'use client';

import { Spacing } from '@workspace/ui/components/box';
import { Form } from '@workspace/ui/components/form';

import { useSummarize } from '../hooks';
import { OutcomeMdEditor } from './outcom-md';
import { OutcomePdf } from './outcome-pdf';

// ----------------------------------------------------------------------

export const OutcomeForm = () => {
  const { form, onSubmit, progress, isPdfPending, pdfData } = useSummarize();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <OutcomeMdEditor />

        <Spacing size={20} />

        <OutcomePdf pdfUrl={pdfData} progress={progress} />
      </form>
    </Form>
  );
};
