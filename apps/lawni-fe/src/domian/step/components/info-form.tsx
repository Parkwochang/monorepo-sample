'use client';

import { useFieldArray, useForm } from 'react-hook-form';

import { Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';
import { Button } from '@workspace/ui/components/button';
import { CategoryEntity } from '@workspace/http/lawni/category';
import { Form, FormField, FormItem, FormLabel, FormMessage, Textarea } from '@workspace/ui/components/form';
import { useCustomRouter } from '@workspace/ui/hooks';
import { setSessionStorage } from '@repo/utils';

// ----------------------------------------------------------------------

interface InfoFormProps {
  categoryDetail: CategoryEntity.CategoryDetailRes[];
  code: string;
}

export const InfoForm = ({ categoryDetail, code }: InfoFormProps) => {
  const { push, query } = useCustomRouter();

  const form = useForm({
    defaultValues: {
      questions: categoryDetail.map((detail) => ({
        question: detail.description,
        answer: '',
      })),
    },
    mode: 'onChange',
  });

  const onSubmit = form.handleSubmit(
    (data) => {
      setSessionStorage('info', data);
      push({
        pathname: '/chat',
        query: {
          step: '3',
          code,
        },
      });
    },
    (err) => {
      console.log(err);
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className="px-5 py-3 border bg-blue-200 rounded-lg shadow-sm">
          <Text as="p" className="font-semibold text-center">
            입력 팁
          </Text>
          <Spacing size={20} />
          <div className="flex flex-col gap-1">
            <Text as="p" size={'sm'} className="text-gray-500">
              • 구체적인 날짜, 금액, 장소를 포함해주세요
            </Text>
            <Text as="p" size={'sm'} className="text-gray-500">
              • 관련 증거자료가 있다면 자세히 적어주세요
            </Text>
            <Text as="p" size={'sm'} className="text-gray-500">
              • 다음 단계에서 AI와 더 자세한 상담을 진행합니다
            </Text>
          </div>
          <Spacing size={10} />
        </div>

        <Spacing size={20} />

        <div className="bg-white rounded-lg px-5 py-3 shadow-md">
          <Text as="p" size={'xl'} className="font-semibold">
            사건 정보 입력
          </Text>

          <Spacing size={10} />

          <Text as="p" size={'sm'} className="text-gray-500">
            * 표시된 항목은 필수 입력 사항이에요
          </Text>
          <Text as="p" size={'sm'} className="text-gray-500">
            상세할수록 정확한 문서를 작성해드릴 수 있어요
          </Text>

          <Spacing size={20} />

          <div className="flex flex-col gap-5">
            {categoryDetail.map((detail, index) => (
              <FormField
                key={detail.id}
                control={form.control}
                name={`questions.${index}.answer`}
                rules={{
                  required: {
                    value: detail.isRequired,
                    message: '필수 정보를 입력해주세요',
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={detail.id.toString()}>
                      {detail.isRequired && '*'} {detail.description}
                    </FormLabel>
                    <Textarea
                      id={detail.id.toString()}
                      placeholder={detail.descriptionSample}
                      {...field}
                      className="py-2 px-3 text-sm"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <Spacing size={20} />
        </div>

        <Spacing size={20} />

        <Button type="submit" size={'lg'} className="w-full" disabled={!form.formState.isValid}>
          상담 진행하기
        </Button>
        <Spacing size={10} />
        <Button type="button" size={'lg'} className="w-full" variant={'secondary'}>
          이전 단계로 돌아가기
        </Button>

        <Spacing size={40} />
      </form>
    </Form>
  );
};
