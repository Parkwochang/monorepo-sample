import z from 'zod';

// ----------------------------------------------------------------------
// prettier-ignore
export const AiChatResDto = z.object({
  success  : z.boolean(),
  content  : z.string().date(),
  note     : z.string().optional(),
  answer   : z.string(),
  checkList: z.array(z.string()),
});

// ----------------------------------------------------------------------
// prettier-ignore
export const CreateAiChatDto = z.object({
  nextChat        : z.string().trim().min(1, '메시지를 입력해주세요'),
  previousChat    : z.string(),
  category        : z.string(),
  categoryDetails : z.array(z.object({
    question      : z.string(),
    answer        : z.string(),
  })).optional(),
});

export const CreatePdfDto = z.object({
  markdown: z.string(),
});

// ----------------------------------------------------------------------
// prettier-ignore
export namespace AiChatEntity {
  export type AiChatRes      = z.infer<typeof AiChatResDto>;
  export type CreateAiChat   = z.infer<typeof CreateAiChatDto>;
  export type CreatePdf      = z.infer<typeof CreatePdfDto>;
}
