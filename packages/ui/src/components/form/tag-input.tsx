'use client';

import { useState } from 'react';

import { Input } from './input';

// ----------------------------------------------------------------------

interface TagInputProps extends React.ComponentProps<'input'> {
  initialTags?: string[] | string;
  maxCount?: number;
  onFormChange?: (tags: string) => void;
}

function getTags(initialTags?: string[] | string): string[] {
  if (!initialTags) return [];

  if (typeof initialTags === 'string') return initialTags.split(',').map((tag) => tag);

  return initialTags;
}

/**
 * 엔터 클릭시 태그생성 input
 * @param initialTags 초기 태그
 * @param maxCount 최대 태그 개수
 * @param onFormChange 태그 변경 시 호출되는 함수
 * @param props 기타 input 속성
 * @returns jsx input
 * @example
 * <FormItem>
    <FormLabel htmlFor={field.name}>선택지</FormLabel>
    <SelectTagInput id={field.name} initialTags={field.value} onFormChange={field.onChange} />
    <FormMessage />
  </FormItem>
 */
export const SelectTagInput = ({ initialTags, maxCount, onFormChange, ...props }: TagInputProps) => {
  const [tag, setTag] = useState(getTags(initialTags));

  const handleAddTag = (newTag: string) => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    const newTagArr = [...new Set([...tag, trimmedTag])];

    if (maxCount && newTagArr.length > maxCount) return;

    setTag(newTagArr);
    onFormChange?.(newTagArr.join(','));
  };

  const handleRemoveTag = (activeTag: string) => () => {
    const newTagArr = tag.filter((t) => t !== activeTag);

    setTag(newTagArr);
    onFormChange?.(newTagArr.join(','));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      e.stopPropagation();

      handleAddTag(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Input onKeyDown={handleKeyDown} {...props} />
      <div className="flex-1 flex flex-wrap gap-1">
        {tag.map((tag) => (
          <div
            key={tag}
            className="relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7 flex items-center"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={handleRemoveTag(tag)}
              className="flex-center absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
