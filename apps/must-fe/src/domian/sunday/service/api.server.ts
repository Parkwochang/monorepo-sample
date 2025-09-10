'use server';

import { httpServerInstance } from '@workspace/http/lib';
import { BOARD_URL } from '@workspace/http/must/url';
import { type BoardEntity } from '@workspace/http/must/board';
import type { ResJson } from '@workspace/http/types/app';

import { withThrowOnError } from '@/shared/service';

// ----------------------------------------------------------------------

export const getServerBoardById = async (id: number) => {
  const { data } = await withThrowOnError(
    httpServerInstance.get(BOARD_URL.boardById(id)).json<ResJson<BoardEntity.BoardResponse>>(),
  );

  return data;
};

export const getServerScheduleById = async (id: number) => {};
