'use client';

import { useQuery } from '@tanstack/react-query';

import { BOARD_URL, CHURCH_SCHEDULE_URL, CHURCH_URL } from '@workspace/http/must/url';
import { getChurchAllList, getChurchById, getChurchList, type ChurchEntity } from '@workspace/http/must/church';
import { getScheduleById, getSchedules, type ScheduleEntity } from '@workspace/http/must/schedule';
import {
  type BoardCommentEntity,
  type BoardEntity,
  getBoardById,
  getBoardComments,
  getBoards,
} from '@workspace/http/must/board';

// ----------------------------------------------------------------------

export const useGetChurches = (params: ChurchEntity.ChurchParam) => {
  return useQuery({
    queryKey: [CHURCH_URL.churches, params],
    queryFn: () => getChurchList(params),
  });
};

export const useGetChurchAllList = () => {
  return useQuery({
    queryKey: [CHURCH_URL.churchesAll],
    queryFn: () => getChurchAllList(),
  });
};

export const useGetChurchById = (seq: number) => {
  return useQuery({
    queryKey: [CHURCH_URL.churchById(seq)],
    queryFn: () => getChurchById(seq),
  });
};

// ----------------------------------------------------------------------

export const useGetChurchSchedules = (params: ScheduleEntity.ScheduleParams) => {
  return useQuery({
    queryKey: [CHURCH_SCHEDULE_URL.schedules, params],
    queryFn: () => getSchedules(params),
  });
};

export const useGetChurchScheduleById = (id: number) => {
  return useQuery({
    queryKey: [CHURCH_SCHEDULE_URL.scheduleById(id)],
    queryFn: () => getScheduleById(id),
  });
};

// ----------------------------------------------------------------------

export const useGetChurchCommunities = (params: BoardEntity.BoardParams) => {
  return useQuery({
    queryKey: [BOARD_URL.boards, params],
    queryFn: () => getBoards(params),
  });
};

export const useGetChurchCommunityById = (id: number) => {
  return useQuery({
    queryKey: [BOARD_URL.boardById(id)],
    queryFn: () => getBoardById(id),
  });
};

export const useGetChurchCommunityComments = (params: BoardCommentEntity.BoardCommentParams) => {
  return useQuery({
    queryKey: [BOARD_URL.boardComments, params],
    queryFn: () => getBoardComments(params),
  });
};
