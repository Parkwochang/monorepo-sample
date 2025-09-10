'use server';

import { httpServerInstance } from '@workspace/http/lib';

import { CATEGORY_URL } from '@workspace/http/lawni/url';
import { type ResJson } from '@workspace/http/types/app';
import { type CategoryEntity } from '@workspace/http/lawni/category';

export const getCategoryListServer = async () => {
  const { data } = await httpServerInstance(CATEGORY_URL.category, {
    method: 'GET',
  }).json<ResJson<CategoryEntity.CategoryRes[]>>();

  return data;
};

export const getCategoryDetailServer = async (categoryId: string) => {
  const { data } = await httpServerInstance(CATEGORY_URL.categoryDetailList, {
    method: 'GET',
    searchParams: {
      categoryId,
    },
  }).json<ResJson<CategoryEntity.CategoryDetailRes[]>>();

  return data;
};
