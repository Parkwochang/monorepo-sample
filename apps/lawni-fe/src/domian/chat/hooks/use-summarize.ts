'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { getSessionStorage } from '@repo/utils';

import { useCreatePdfMutation, useSummarizeChatMutation } from './use-mutations';

// ----------------------------------------------------------------------

export const useSummarize = () => {
  const [progress, setProgress] = useState(0);

  const form = useForm({
    defaultValues: {
      markdown: '',
    },
  });

  const { mutateAsync: summarizeChat } = useSummarizeChatMutation();
  const { mutateAsync: createPdf, isPending: isPdfPending, data: pdfData } = useCreatePdfMutation();

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
    createPdf({ data, setProgress });
  });

  useEffect(() => {
    const chat = getSessionStorage('chat');
    if (chat) {
      summarizeChat({ ...chat, nextChat: '법률 문서를 작성해주세요' } as any).then((res) => {
        form.setValue('markdown', res.note ?? '');
      });
    }
  }, []);

  return { form, onSubmit, progress, isPdfPending, pdfData };
};
