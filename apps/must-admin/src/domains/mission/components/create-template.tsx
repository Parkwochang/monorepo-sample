import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
  SelectTagInput,
  RadioGroup,
  RadioGroupItem,
  Label,
} from '@workspace/ui/components/form';
import { Button, LoadingBtn } from '@workspace/ui/components/button';

import { DIFFICULTY_LEVEL_MAP, MISSION_KIND_TYPE_MAP, MISSION_MULTI_TYPE_MAP } from '@/config/config-map';
import { ContentModal } from '@/components/modal/content-modal';
import { FormSelect } from '@/components/box';
import { objToSelectObj } from '@/lib/utils';
import { useCreateMissionTemplate } from '../hooks';

// ----------------------------------------------------------------------

export const CreateMissionTemplateModal = () => {
  const { form, onSubmit, isPending, missionTypeObserver, missionKindTypeObserver } = useCreateMissionTemplate();

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
                    <OxRadio value={field.value ?? ''} onChange={field.onChange} />
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

function OxRadio({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="flex">
      {['true', 'false'].map((item) => (
        <div key={item} className="flex gap-3 items-center">
          <RadioGroupItem value={item} id={item} />
          <Label htmlFor={item}>{item === 'true' ? 'O' : 'X'}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}
