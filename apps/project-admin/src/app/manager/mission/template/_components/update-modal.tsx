import { zodResolver } from '@hookform/resolvers/zod';

import { CreateMissionDto, MissionEntity, useUpdateMission } from '@workspace/http/must/mission';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';
import { fDate, useDefaultForm, useWatch } from '@repo/core/lib';

import { ContentModal } from '@/components/modal/content-modal';
import { FormSelect } from '@/components/box';
import { DIFFICULTY_LEVEL_MAP, MISSION_TYPE_MAP } from '@/config/config-map';
import { Textarea } from '@workspace/ui/components/form';

export const UpdateMissionTemplateModal = ({ data }: { data: MissionEntity.Mission }) => {
  const { title, description, missionType, rightAnswer, multipleChoice, difficultyLevel, talentReward } = data;

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
    values: { title, description, missionType, rightAnswer, multipleChoice, difficultyLevel, talentReward },
    resolver: zodResolver(CreateMissionDto),
  });

  const { mutate: updateMission, isPending } = useUpdateMission(data.id);

  const missionTypeObserver = useWatch({ control: form.control, name: 'missionType' });

  const onSubmit = form.handleSubmit(
    (data) => {
      updateMission({ ...data, talentReward: Number(data.talentReward) });
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <ContentModal title="미션 템플릿 수정" desc="미션 템플릿을 수정해주세요." button={<Button>템플릿 수정</Button>}>
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
            수정하기
          </LoadingBtn>
        </form>
      </Form>
    </ContentModal>
  );
};
