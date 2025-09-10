import type { BoardEntity } from '@workspace/http/must/board';

export const CREATE_BOARD_FORM = {
  title: '',
  content: '',
  category: 'GENERAL',
  postType: 'NORMAL',
  isPublic: true,
  isNotice: false,
  isActive: true,
} satisfies BoardEntity.CreateBoard;

export const CREATE_BOARD_COMMENT_FORM = {
  content: '',
};
