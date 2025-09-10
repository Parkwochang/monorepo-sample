import { httpInstance } from '@workspace/http/lib';
import { CATEGORY_URL } from '@workspace/http/lawni/url';
import type { ResJson } from '@workspace/http/types/app';

import { type CategoryEntity } from './category.dto';

export const getCategoryList = async () => {
  const { data } = await httpInstance.get(CATEGORY_URL.category).json<ResJson<CategoryEntity.CategoryRes[]>>();

  return data;
};

export const getCategoryDetailList = async () => {
  const { data } = await httpInstance
    .get(CATEGORY_URL.categoryDetailList)
    .json<ResJson<CategoryEntity.CategoryDetailRes[]>>();

  return data;
};
