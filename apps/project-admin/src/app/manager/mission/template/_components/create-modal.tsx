import { zodResolver } from '@hookform/resolvers/zod';
import { fDate, useDefaultForm, useWatch } from '@repo/core/lib';
import { CreateMissionDto, useCreateMission } from '@workspace/http/must/mission';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { Form, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@workspace/ui/components/form';

import { ContentModal } from '@/components/modal/content-modal';
import { FormSelect } from '@/components/box';
import { DIFFICULTY_LEVEL_MAP, MISSION_TYPE_MAP } from '@/config/config-map';

export const CreateMissionTemplateModal = () => {
  const form = useDefaultForm({
    defaultValues: {
      title: '',
      description: '',
      missionType: 'WRITE',
      rightAnswer: '',
      multipleChoice: '',
      difficultyLevel: 'BEGINNER',
      talentReward: 0,
    },
    resolver: zodResolver(CreateMissionDto),
  });

  const { mutate: createMember, isPending } = useCreateMission();

  const missionTypeObserver = useWatch({ control: form.control, name: 'missionType' });

  const onSubmit = form.handleSubmit(
    (data) => {
      createMember(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <ContentModal title="미션 템플릿 등록" desc="미션 템플릿을 등록해주세요." button={<Button>템플릿 등록</Button>}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>미션 제목</FormLabel>
                <Input className="py-2 px-3" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>미션 설명</FormLabel>
                <Textarea className="py-2 px-3" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="missionType"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel htmlFor={field.name}>유형</FormLabel>
                <FormSelect
                  className="w-full"
                  filterCondition={Object.entries(MISSION_TYPE_MAP).map(([key, value]) => ({
                    label: value,
                    value: key,
                  }))}
                  onChange={field.onChange}
                  value={field.value ?? ''}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficultyLevel"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel htmlFor={field.name}>난이도</FormLabel>
                <FormSelect
                  className="w-full"
                  filterCondition={Object.entries(DIFFICULTY_LEVEL_MAP).map(([key, value]) => ({
                    label: value,
                    value: key,
                  }))}
                  onChange={field.onChange}
                  value={field.value ?? ''}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {missionTypeObserver !== 'WRITE' && (
            <FormField
              control={form.control}
              name="rightAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>정답</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {missionTypeObserver === 'MULTI' && (
            <FormField
              control={form.control}
              name="multipleChoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>선택지</FormLabel>
                  <Input className="py-2 px-3" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="talentReward"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>보상</FormLabel>
                <Input className="py-2 px-3" {...field} type="number" />
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingBtn
            type="submit"
            size={'lg'}
            className="col-span-2"
            // disabled={!form.formState.isValid}
            isLoading={isPending}
          >
            등록하기
          </LoadingBtn>
        </form>
      </Form>
    </ContentModal>
  );
};
