import { MustInstance } from '@workspace/http/lib';
import { BOARD_URL } from '@workspace/http/must/url';
import type { PaginationList, ResJson } from '@workspace/http/types/app';

import { BoardCommentParamsDto, BoardParamsDto, type BoardEntity, type BoardCommentEntity } from './board.dto';

// ----------------------------------------------------------------------
// ! 게시판

export const getBoards = async (params: BoardEntity.BoardParams) => {
  const searchParams = BoardParamsDto.parse(params);

  const { data } = await MustInstance.get(BOARD_URL.boards, {
    searchParams,
  }).json<PaginationList<BoardEntity.BoardResponse>>();

  return data;
};

export const getBoardById = async (id: number) => {
  const { data } = await MustInstance.get(BOARD_URL.boardById(id)).json<ResJson<BoardEntity.BoardResponse>>();

  return data;
};

export const deleteBoard = async (id: number) => {
  const { data } = await MustInstance.delete(BOARD_URL.boardById(id)).json<ResJson<null>>();

  return data;
};

export const createBoard = async (json: BoardEntity.CreateBoard) => {
  const { data } = await MustInstance.post(BOARD_URL.board, {
    json,
  }).json<ResJson<null>>();

  return data;
};

export const updateBoard = async (json: BoardEntity.UpdateBoard) => {
  const { data } = await MustInstance.put(BOARD_URL.board, {
    json,
  }).json<ResJson<null>>();

  return data;
};

// ----------------------------------------------------------------------
// ! 게시판 댓글

export const getBoardComments = async (params: BoardCommentEntity.BoardCommentParams) => {
  const searchParams = BoardCommentParamsDto.parse(params);

  const { data } = await MustInstance.get(BOARD_URL.boardComments, {
    searchParams,
  }).json<PaginationList<BoardCommentEntity.BoardCommentResponse>>();

  return data;
};

export const getBoardCommentById = async (id: number) => {
  const { data } = await MustInstance.get(BOARD_URL.boardCommentById(id)).json<
    ResJson<BoardCommentEntity.BoardCommentResponse>
  >();

  return data;
};

export const deleteBoardComment = async (id: number) => {
  const { data } = await MustInstance.delete(BOARD_URL.boardCommentById(id)).json<ResJson<null>>();

  return data;
};

export const createBoardComment = async (json: BoardCommentEntity.CreateBoardComment) => {
  const { data } = await MustInstance.post(BOARD_URL.boardComment, {
    json,
  }).json<ResJson<null>>();

  return data;
};

export const updateBoardComment = async (json: BoardCommentEntity.UpdateBoardComment) => {
  const { data } = await MustInstance.put(BOARD_URL.boardComment, {
    json,
  }).json<ResJson<null>>();

  return data;
};
