import { httpInstance } from '@workspace/http/lib';
import { AI_CHAT_URL } from '@workspace/http/lawni/url';
import type { ResJson } from '@workspace/http/types/app';

import { type AiChatEntity } from './chat.dto';

export const createAiChat = async (json: AiChatEntity.CreateAiChat) => {
  const data = await httpInstance(AI_CHAT_URL.chat, {
    method: 'POST',
    json,
  }).json<AiChatEntity.AiChatRes>();

  return data;
};

export const summarizeChat = async (json: AiChatEntity.CreateAiChat) => {
  const data = await httpInstance(AI_CHAT_URL.summarizeChat, {
    method: 'POST',
    json,
  }).json<AiChatEntity.AiChatRes>();

  return data;
};

export const createPdf = async (json: AiChatEntity.CreatePdf, setProgress: (progress: number) => void) => {
  const data = await httpInstance(AI_CHAT_URL.createPdf, {
    method: 'POST',
    json,
    onDownloadProgress(progressState, chunk) {
      setProgress(progressState.percent * 100);
    },
    // signal,
  }).blob();

  return URL.createObjectURL(data);
};
