import { MustInstance } from '@workspace/http/lib';
import { AI_CHAT_URL } from '@workspace/http/must/url';

import { type AiChatEntity } from './ai-chat.dto';

// ----------------------------------------------------------------------
// ! 게시판

export const createAiChat = async (json: AiChatEntity.CreateAiChat) => {
  const res = await MustInstance.post(AI_CHAT_URL.aiChat, {
    json,
  }).json<AiChatEntity.AiChatResponse>();

  return res;
};
