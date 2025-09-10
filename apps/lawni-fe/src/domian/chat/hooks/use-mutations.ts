'use client';

import { useLoadingStore } from '@/shared/store';
import { useMutation } from '@tanstack/react-query';

import { createAiChat, createPdf, summarizeChat, type AiChatEntity } from '@workspace/http/lawni/chat';

// ----------------------------------------------------------------------

export const useCreateAiChatMutation = () => {
  return useMutation({
    mutationFn: (data: AiChatEntity.CreateAiChat) => createAiChat(data),
  });
};

export const useSummarizeChatMutation = () => {
  const { startLoading, stopLoading } = useLoadingStore.use.actions();

  return useMutation({
    mutationFn: (data: AiChatEntity.CreateAiChat) => summarizeChat(data),
    onMutate: () => {
      startLoading();
    },
    onSettled: () => {
      stopLoading();
    },
  });
};

export const useCreatePdfMutation = () => {
  return useMutation({
    mutationFn: ({ data, setProgress }: { data: AiChatEntity.CreatePdf; setProgress: (progress: number) => void }) =>
      createPdf(data, setProgress),
  });
};
