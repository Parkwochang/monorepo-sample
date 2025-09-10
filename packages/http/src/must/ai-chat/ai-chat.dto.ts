import { z } from 'zod';

// ----------------------------------------------------------------------
// ! 게시판 목록
// prettier-ignore

export const AiChatResDto = z.object({
  content         : z.string(),
  provider        : z.string(),
  success         : z.boolean(),
  errorMessage    : z.string().nullable(),
  tokensUsed      : z.number(),
  processingTimeMs: z.number(),
  responseTime    : z.string(),
  requestId       : z.string().nullable(),
  sessionId       : z.string().nullable(),
});

export const CreateAiChatDto = z.object({
  content: z.string().trim().min(1, '질문을 입력해주세요'),
  instructions: z.string(),
  maxTokens: z.number().default(500),
});

// ----------------------------------------------------------------------
// prettier-ignore

export namespace AiChatEntity {
  export type AiChatResponse = z.infer<typeof AiChatResDto>;
  export type CreateAiChat   = z.input<typeof CreateAiChatDto>;
}
