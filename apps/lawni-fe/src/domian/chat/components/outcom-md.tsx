import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';

import { cn } from '@workspace/ui/lib';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { FormField } from '@workspace/ui/components/form';
import { CustomIcon, Text } from '@workspace/ui/components/text';

// ----------------------------------------------------------------------

export const OutcomeMdEditor = () => {
  const [isEdit, setIsEdit] = useState(false);

  const { control } = useFormContext();

  return (
    <div className="bg-white rounded-lg px-5 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <Text as="p" size={'lg'} className="flex items-center gap-1">
          <CustomIcon name="FileText" size={15} />
          법률 문서
        </Text>
        <Button type="button" size={'xs'} variant={'outline'} className="text-xs" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? '미리보기' : '편집'}
        </Button>
      </div>
      <Spacing size={10} />
      <FormField
        control={control}
        name="markdown"
        render={({ field }) => (
          <div
            className={cn('border p-2 rounded-lg h-[350px] overflow-y-auto whitespace-pre-wrap', isEdit && 'h-full')}
            data-color-mode="light"
          >
            {isEdit ? (
              <OutcomeEdit content={field.value} setMD={field.onChange} />
            ) : (
              <OutcomePreview content={field.value} />
            )}
          </div>
        )}
      />
    </div>
  );
};

const OutcomePreview = ({ content }: { content: string }) => {
  return <MDEditor.Markdown source={content} className="text-wrap whitespace-pre-wrap" />;
};

const OutcomeEdit = ({ content, setMD }: { content: string; setMD: (md: string) => void }) => {
  return (
    <MDEditor
      height={'100%'}
      value={content}
      onChange={(value) => setMD(value ?? '')}
      preview="edit"
      extraCommands={[]}
    />
  );
};
