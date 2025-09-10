import { z } from 'zod';

// ----------------------------------------------------------------------
// ! 게시판 목록
// prettier-ignore

export const BoardResDto = z.object({
  id           : z.number(),
  title        : z.string(),
  content      : z.string(),
  category     : z.string(),
  postType     : z.string(),
  isPublic     : z.boolean(),
  createdByName: z.string(),
  updatedByName: z.string(),
  isActive     : z.boolean(),
  commentCount : z.number(),
  viewCount    : z.number(),
  likeCount    : z.number(),
  imageUrl     : z.string(),
  updatedAt    : z.string().datetime(),
  createdAt    : z.string().datetime(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const BoardParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))), //.transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))), //.optional().default('10'),
  searchStartDate: z.string().date().optional(),
  searchEndDate  : z.string().date().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateBoardDto = z.object({
  churchId         : z.number().optional(),
  title            : z.string().trim().min(1, { message: '제목을 입력해주세요.' }),
  content          : z.string().trim().min(1, { message: '내용을 입력해주세요.' }),
  category         : z.enum(['CELL_GROUP', 'SENIORS', 'QNA', 'PRAYER', 'GENERAL', 'VOLUNTEER', 'MISSION', 'CHOIR', 'MEN', 'NOTICE', 'EVENT', 'WOMEN', 'CHILDREN', 'SUNDAY_SCHOOL', 'TESTIMONY', 'ANNOUNCEMENT', 'YOUTH', 'BIBLE_STUDY', 'MINISTRY', 'FELLOWSHIP']).default('GENERAL'),
  postType         : z.enum(['NORMAL', 'COMMENT', 'REPLY']).default('NORMAL'),
  isPublic         : z.boolean().default(true),
  restrictedGroupId: z.number().optional(),
  isPinned         : z.boolean().default(false),
  isNotice         : z.boolean().default(false),
  isActive         : z.boolean().default(true),
  imageUrl         : z.string().optional(),
})

export const UpdateBoardDto = CreateBoardDto.extend({
  id: z.number(),
});

// ----------------------------------------------------------------------
// ! 게시판 댓글
// prettier-ignore

export const BoardCommentResDto = z.object({
  id           : z.number(),
  content      : z.string(),
  createdAt    : z.string().datetime(),
  createdBy    : z.number(),
  createdByName: z.string(),
  updatedAt    : z.string().datetime(),
  updatedBy    : z.number(),
  updatedByName: z.string(),
  isActive     : z.boolean(),
  likeCount    : z.number(),
  replyCount   : z.number(),
  isLiked      : z.boolean(),
});

// ----------------------------------------------------------------------
// prettier-ignore

export const BoardCommentParamsDto = z.object({
  page           : z.string().refine((val) => !isNaN(Number(val))).transform((val) => Number(val) -1).optional().default('0'),
  size           : z.string().refine((val) => !isNaN(Number(val))).optional().default('10'),
  postId         : z.number(),
  searchStartDate: z.string().date().optional(),
  searchEndDate  : z.string().date().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const CreateBoardCommentDto = z.object({
  postId         : z.number(),
  content        : z.string().trim().min(1, { message: '내용을 입력해주세요.' }),
})

// ----------------------------------------------------------------------
// prettier-ignore

export const UpdateBoardCommentDto = z.object({
  id     : z.number(),
  content: z.string().trim().min(1, { message: '내용을 입력해주세요.' }),
})

// ----------------------------------------------------------------------
// prettier-ignore

export namespace BoardEntity {
  export type BoardResponse = z.infer<typeof BoardResDto>;
  export type BoardParams   = z.input<typeof BoardParamsDto>;
  export type CreateBoard   = z.input<typeof CreateBoardDto>;
  export type UpdateBoard   = z.input<typeof UpdateBoardDto>;
}

// ----------------------------------------------------------------------
// prettier-ignore

export namespace BoardCommentEntity {
  export type BoardCommentResponse = z.infer<typeof BoardCommentResDto>;
  export type BoardCommentParams   = z.input<typeof BoardCommentParamsDto>;
  export type CreateBoardComment   = z.input<typeof CreateBoardCommentDto>;
  export type UpdateBoardComment   = z.input<typeof UpdateBoardCommentDto>;
}
