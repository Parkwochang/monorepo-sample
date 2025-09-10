import { CategoryEntity } from '@workspace/http/lawni/category';
import { CategoryList } from './category-list';
import { ProcessStepper } from './process-stepper';
import { Spacing } from '@workspace/ui/components/box';

interface CategoryScreenProps {
  categoryList: CategoryEntity.CategoryRes[];
  step?: string;
}

export const CategoryScreen = ({ categoryList, step = '1' }: CategoryScreenProps) => {
  return (
    <main className="h-dvh px-5">
      <Spacing size={30} />

      <ProcessStepper step={Number(step)} totalStep={5} />

      <Spacing size={20} />

      <CategoryList categoryList={categoryList} />
    </main>
  );
};
