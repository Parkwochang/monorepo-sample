'use client';

import { uuids4 } from '@/lib/utils';
import { setSessionStorage } from '@repo/utils';
import { type CategoryEntity } from '@workspace/http/lawni/category';
import { Spacing, Stepper, StepperIndicator, StepperItem, StepperTrigger } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { Text } from '@workspace/ui/components/text';
import Link from 'next/link';
import { useState } from 'react';

interface CategoryListProps {
  categoryList: CategoryEntity.CategoryRes[];
}

export const CategoryList = ({ categoryList }: CategoryListProps) => {
  const [active, setActive] = useState<CategoryEntity.CategoryRes | null>(null);

  const handleSelectCategory = () => {
    if (!active) return;

    setSessionStorage('category', active);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {categoryList.map((category) => (
          <CategoryItemBox
            key={category.categoryCode}
            isActive={active?.categoryCode === category.categoryCode}
            onClick={() => setActive(category)}
          >
            <Text as="p" size={'xl'} className="font-semibold">
              {category.categoryName}
            </Text>
            <Text as="p" size={'sm'} className="text-gray-500">
              {category.description}
            </Text>
          </CategoryItemBox>
        ))}
      </div>

      <Spacing size={40} />

      <div className="bg-white rounded-lg px-5 py-3 shadow-md">
        {active && (
          <Text as="p" className="text-center text-blue-700 font-semibold">
            {active.categoryName}를 선택했어요
          </Text>
        )}
        <Spacing size={20} />
        <Button size={'lg'} className="w-full" disabled={!active}>
          <Link
            className="w-full"
            onClick={handleSelectCategory}
            href={{
              query: {
                categoryId: active?.id,
                code: active?.categoryCode,
                step: '2',
              },
            }}
          >
            다음 단계로 진행
          </Link>
        </Button>
      </div>
    </>
  );
};

function CategoryItemBox({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      data-active={isActive}
      className="relative bg-white rounded-lg px-5 py-3 shadow-md border-blue-500 data-[active=true]:bg-blue-50 data-[active=true]:border transition-colors duration-200"
      onClick={onClick}
    >
      {children}
      {isActive && (
        <div className="absolute top-[50%] right-5 translate-y-[-50%] size-5 rounded-full bg-blue-500 flex-center">
          <div className="size-2 rounded-full bg-white" />
        </div>
      )}
    </div>
  );
}
