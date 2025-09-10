import { zodResolver } from '@hookform/resolvers/zod';
import { useDefaultForm } from '@repo/core/lib';
import { CreateMissionScheduleDto, useCreateMissionSchedule, useMissionsQuery } from '@workspace/http/must/mission';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { Form, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@workspace/ui/components/form';

import { ContentModal } from '@/components/modal/content-modal';
import { FormSelect } from '@/components/box';
import { useGetChurches } from '@workspace/http/must/church';
import { DatePickerForm } from '@workspace/ui/components/calendar';

export const CreateMissionScheduleModal = () => {
  const form = useDefaultForm({
    defaultValues: {
      templateId: 0,
      churchId: 0,
      weekStartDate: '',
      weekEndDate: '',
      missionOrder: 1,
      description: '',
    },
    resolver: zodResolver(CreateMissionScheduleDto),
  });

  const { data: templates } = useMissionsQuery({ page: '0', size: '1000' });
  const { data: churches } = useGetChurches({ page: '0', size: '1000' });

  const { mutate: createMissionSchedule, isPending } = useCreateMissionSchedule();

  const onSubmit = form.handleSubmit(
    (data) => {
      createMissionSchedule(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <ContentModal title="미션 일정 등록" desc="미션 일정을 등록해주세요." button={<Button>일정 등록</Button>}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="templateId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>미션 템플릿</FormLabel>
                <FormSelect
                  className="w-full"
                  placeholder="템플릿을 선택해주세요"
                  filterCondition={
                    templates?.content.map((template) => ({
                      label: template.title,
                      value: template.id.toString(),
                    })) ?? []
                  }
                  onChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString() ?? ''}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weekStartDate"
            render={({ field }) => (
              <DatePickerForm
                id={field.name}
                fieldName={field.name}
                label={'미션시작일'}
                className="col-span-2"
                disabled={[{ before: new Date() }]}
              />
            )}
          />

          <FormField
            control={form.control}
            name="weekEndDate"
            render={({ field }) => (
              <DatePickerForm
                id={field.name}
                fieldName={field.name}
                label={'미션종료일'}
                className="col-span-2"
                disabled={[{ before: new Date() }]}
              />
            )}
          />

          <FormField
            control={form.control}
            name="missionOrder"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>미션 순서</FormLabel>
                <Input className="py-2 px-3" {...field} type="number" min={1} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>교회 선택</FormLabel>
                <FormSelect
                  className="w-full"
                  placeholder="교회를 선택해주세요"
                  filterCondition={
                    churches?.content.map((church) => ({
                      label: church.churchName,
                      value: church.id.toString(),
                    })) ?? []
                  }
                  onChange={(value) => field.onChange(Number(value))}
                  value={field.value.toString() ?? ''}
                />
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
