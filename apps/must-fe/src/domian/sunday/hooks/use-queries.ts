'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getChurchById } from '@workspace/http/must/church';
import {
  getBoardById,
  getBoardComments,
  getBoards,
  type BoardEntity,
  type BoardCommentEntity,
} from '@workspace/http/must/board';
import { getScheduleById, getSchedules, type ScheduleEntity } from '@workspace/http/must/schedule';
import { BOARD_URL, CHURCH_SCHEDULE_URL, CHURCH_URL } from '@workspace/http/must/url';

// ----------------------------------------------------------------------

export const useGetChurchByIdQuery = (id: number) => {
  return useQuery({
    queryKey: [CHURCH_URL.church, id],
    queryFn: () => getChurchById(id),
  });
};

export const useGetCommunitiesQuery = (params: BoardEntity.BoardParams) => {
  return useQuery({
    queryKey: [BOARD_URL.boards, params],
    queryFn: () => getBoards(params),
  });
};

export const useGetInfiniteCommunitiesQuery = () => {
  return useInfiniteQuery({
    queryKey: [BOARD_URL.boards],
    queryFn: ({ pageParam = 1 }) => getBoards({ page: pageParam.toString(), size: '10' }),
    getNextPageParam: ({ page, totalPages }, pages) => (totalPages > page ? page : undefined),
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
    initialPageParam: 0,
  });
};

export const useGetCommunityByIdQuery = (id: number) => {
  return useQuery({
    queryKey: [BOARD_URL.boards, id],
    queryFn: () => getBoardById(id),
  });
};

export const useGetCommentsQuery = (params: BoardCommentEntity.BoardCommentParams) => {
  return useQuery({
    queryKey: [BOARD_URL.boardComments, params],
    queryFn: () => getBoardComments(params),
  });
};

export const useGetSchedulesQuery = (params: ScheduleEntity.ScheduleParams) => {
  return useQuery({
    queryKey: [CHURCH_SCHEDULE_URL.schedules, params],
    queryFn: () => getSchedules(params),
  });
};

export const useGetScheduleByIdQuery = (id: number) => {
  return useQuery({
    queryKey: [CHURCH_SCHEDULE_URL.schedules, id],
    queryFn: () => getScheduleById(id),
  });
};
