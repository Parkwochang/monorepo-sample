'use clinet';

import { useMutation } from '@tanstack/react-query';

import {
  type BoardCommentEntity,
  type BoardEntity,
  createBoard,
  createBoardComment,
  deleteBoardComment,
  updateBoardComment,
} from '@workspace/http/must/board';
import { type AiChatEntity, createAiChat } from '@workspace/http/must/ai-chat';

import { BOARD_URL } from '@workspace/http/must/url';

// ----------------------------------------------------------------------

export const useCreateBoardMutation = () => {
  return useMutation({
    mutationFn: (data: BoardEntity.CreateBoard) => createBoard(data),
    meta: {
      invalidateQueries: [BOARD_URL.boards],
      successMessage: '게시글이 등록되었어요',
    },
  });
};

export const useCreateCommentMutation = () => {
  return useMutation({
    mutationFn: (data: BoardCommentEntity.CreateBoardComment) => createBoardComment(data),
    meta: {
      invalidateQueries: [BOARD_URL.boardComments],
    },
  });
};

export const useUpdateCommentMutation = () => {
  return useMutation({
    mutationFn: (data: BoardCommentEntity.UpdateBoardComment) => updateBoardComment(data),
    meta: {
      invalidateQueries: [BOARD_URL.boardComments],
    },
  });
};

export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteBoardComment(id),
    meta: {
      invalidateQueries: [BOARD_URL.boardComments],
    },
  });
};

export const useCreateChatMutation = () => {
  return useMutation({
    mutationFn: (data: AiChatEntity.CreateAiChat) => createAiChat(data),
  });
};
