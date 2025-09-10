import { BoardEntity } from '@workspace/http/must/board';

export const COMMUNITY_FORM: BoardEntity.CreateBoard = {
  title: '',
  content: '',
  category: 'GENERAL',
  postType: 'NORMAL',
  isPublic: true,
  isPinned: false,
  isNotice: false,
  isActive: true,
  imageUrl: undefined,
};
