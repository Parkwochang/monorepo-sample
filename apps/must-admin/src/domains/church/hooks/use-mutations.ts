'use client';

import { useMutation } from '@tanstack/react-query';

import { BOARD_URL, CHURCH_SCHEDULE_URL, CHURCH_URL } from '@workspace/http/must/url';
import { createChurch, deleteChurch, updateChurch, type ChurchEntity } from '@workspace/http/must/church';
import { createSchedule, deleteSchedule, type ScheduleEntity, updateSchedule } from '@workspace/http/must/schedule';
import { type BoardEntity, createBoard, deleteBoard, updateBoard } from '@workspace/http/must/board';

// ----------------------------------------------------------------------

export const useCreateChurch = () => {
  return useMutation({
    mutationFn: (church: ChurchEntity.CreateChurch) => createChurch(church),
    meta: {
      successMessage: '교회 등록에 성공했어요',
      errorMessage: '교회 등록에 실패했어요',
      invalidateQueries: [CHURCH_URL.churches],
    },
  });
};

export const useUpdateChurch = () => {
  return useMutation({
    mutationFn: (church: ChurchEntity.UpdateChurch) => updateChurch(church),
    meta: {
      successMessage: '교회 수정에 성공했어요',
      errorMessage: '교회 수정에 실패했어요',
      invalidateQueries: (church: ChurchEntity.UpdateChurch) => [
        [CHURCH_URL.churches],
        [CHURCH_URL.churchById(church.id)],
      ],
    },
  });
};

export const useDeleteChurch = () => {
  return useMutation({
    mutationFn: (id: number) => deleteChurch(id),
    meta: {
      successMessage: '교회 삭제에 성공했어요',
      errorMessage: '교회 삭제에 실패했어요',
      invalidateQueries: [CHURCH_URL.churches],
    },
  });
};

// ----------------------------------------------------------------------

export const useCreateChurchSchedule = () => {
  return useMutation({
    mutationFn: (data: ScheduleEntity.CreateSchedule) => createSchedule(data),
    meta: {
      successMessage: '일정이 생성되었습니다.',
      errorMessage: '일정 생성에 실패했습니다.',
      invalidateQueries: [CHURCH_SCHEDULE_URL.schedules],
    },
  });
};

export const useUpdateChurchSchedule = () => {
  return useMutation({
    mutationFn: (json: { id: number; data: ScheduleEntity.CreateSchedule }) => updateSchedule(json.id, json.data),
    meta: {
      successMessage: '일정이 수정되었습니다.',
      errorMessage: '일정 수정에 실패했습니다.',
      invalidateQueries: (id: number) => [CHURCH_SCHEDULE_URL.scheduleById(id), CHURCH_SCHEDULE_URL.schedules],
    },
  });
};

export const useDeleteChurchSchedule = () => {
  return useMutation({
    mutationFn: (id: number) => deleteSchedule(id),
    meta: {
      successMessage: '일정이 삭제되었습니다.',
      errorMessage: '일정 삭제에 실패했습니다.',
      invalidateQueries: (id: number) => [CHURCH_SCHEDULE_URL.scheduleById(id), CHURCH_SCHEDULE_URL.schedules],
    },
  });
};

// ----------------------------------------------------------------------

export const useCreateChurchCommunity = () => {
  return useMutation({
    mutationFn: (data: BoardEntity.CreateBoard) => createBoard(data),
    meta: {
      successMessage: '게시판이 생성되었습니다.',
      errorMessage: '게시판 생성에 실패했습니다.',
      invalidateQueries: [BOARD_URL.boards],
    },
  });
};

export const useUpdateChurchCommunity = () => {
  return useMutation({
    mutationFn: (data: BoardEntity.UpdateBoard) => updateBoard(data),
    meta: {
      successMessage: '게시판이 수정되었습니다.',
      errorMessage: '게시판 수정에 실패했습니다.',
      invalidateQueries: [BOARD_URL.boards],
    },
  });
};

export const useDeleteChurchCommunity = () => {
  return useMutation({
    mutationFn: (id: number) => deleteBoard(id),
    meta: {
      successMessage: '게시판이 삭제되었습니다.',
      errorMessage: '게시판 삭제에 실패했습니다.',
      invalidateQueries: (id: number) => [BOARD_URL.boards],
    },
  });
};
