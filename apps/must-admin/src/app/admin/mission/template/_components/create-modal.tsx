import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  SelectTagInput,
} from '@workspace/ui/components/form';
import { CreateMissionDto, useCreateMission } from '@workspace/http/must/mission';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { fDate, useDefaultForm, useWatch } from '@repo/core/lib';

import { DIFFICULTY_LEVEL_MAP, MISSION_KIND_TYPE_MAP, MISSION_MULTI_TYPE_MAP } from '@/config/config-map';
import { CREATE_MISSION_FORM } from '@/config/form';
import { ContentModal } from '@/components/modal/content-modal';
import { FormSelect } from '@/components/box';
import { objToSelectObj } from '@/lib/utils';

export const CreateMissionTemplateModal = () => {
  const form = useDefaultForm({
    defaultValues: CREATE_MISSION_FORM,
    resolver: zodResolver(CreateMissionDto),
  });

  const { mutate: createMember, isPending } = useCreateMission();

  const missionTypeObserver = useWatch({ control: form.control, name: 'missionType' });
  const missionKindTypeObserver = useWatch({ control: form.control, name: 'missionKindType' });

  const onSubmit = form.handleSubmit(
    (data) => {
      const { missionType, missionKindType, rightAnswer, ...restData } = data;

      createMember({
        ...restData,
        missionType,
        ...(missionKindType === 'OX' && { multipleChoice: 'true,false' }),
        ...(missionType === 'MULTI' && { rightAnswer }),
      });
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
                <FormLabel htmlFor={field.name}>미션종류</FormLabel>
                <FormSelect
                  className="w-full"
                  filterCondition={objToSelectObj(MISSION_KIND_TYPE_MAP, { label: 'key', value: 'value' })}
                  onChange={field.onChange}
                  value={field.value ?? ''}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {missionTypeObserver === 'MULTI' && (
            <FormField
              control={form.control}
              name="missionKindType"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel htmlFor={field.name}>유형</FormLabel>
                  <FormSelect
                    className="w-full"
                    filterCondition={objToSelectObj(MISSION_MULTI_TYPE_MAP, { label: 'key', value: 'value' })}
                    onChange={field.onChange}
                    value={field.value ?? ''}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {missionTypeObserver !== 'WRITE' && (
            <FormField
              control={form.control}
              name="rightAnswer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>정답</FormLabel>
                  {missionKindTypeObserver !== 'OX' ? (
                    <Input className="py-2 px-3" {...field} />
                  ) : (
                    <>
                      <input type="radio" value={'true'} onChange={field.onChange} />
                      <input type="radio" value={'false'} onChange={field.onChange} />
                    </>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {missionKindTypeObserver !== 'OX' && (
            <FormField
              control={form.control}
              name="multipleChoice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>선택지</FormLabel>
                  <SelectTagInput
                    id={field.name}
                    initialTags={field.value}
                    onFormChange={field.onChange}
                    className="py-2 px-3"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

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
