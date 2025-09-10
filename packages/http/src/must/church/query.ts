'use client';

import { useQuery } from '@tanstack/react-query';

import { CHURCH_URL } from '../url';
import { getChurchAllList, getChurchById, getChurchList } from './api';
import { type ChurchEntity } from './dto';

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
