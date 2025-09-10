import { type ChurchEntity } from '@workspace/http/must/church';
import { CREATE_CHURCH_FORM } from '@/config/form';

// ----------------------------------------------------------------------

export const transformChurch = (church: ChurchEntity.Church) => {
  const { ...rest } = church;

  return {
    ...CREATE_CHURCH_FORM,
    ...rest,
  } as ChurchEntity.CreateChurch satisfies ChurchEntity.CreateChurch;
};
