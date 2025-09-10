import { FormSelect } from '@/components/box';
import { ContentModal } from '@/components/modal/content-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { fDate, useDefaultForm } from '@repo/core/lib';
import { useGetChurches } from '@workspace/http/must/church';
import { CreateScheduleDto, useCreateSchedule } from '@workspace/http/must/schedule';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { DatePickerForm } from '@workspace/ui/components/calendar';
import {
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@workspace/ui/components/form';

export const CreateScheduleModal = () => {
  const form = useDefaultForm({
    defaultValues: {
      title: '',
      description: '',
      startDate: fDate(new Date()),
      endDate: fDate(new Date()),
      location: '',
      isAllDay: false,
      churchId: 0,
      color: '',
    },
    resolver: zodResolver(CreateScheduleDto),
  });

  const { data: churches } = useGetChurches({ page: '0', size: '1000' });

  const { mutate: createMember, isPending } = useCreateSchedule();

  const onSubmit = form.handleSubmit(
    ({ startDate, endDate, ...data }) => {
      const start = new Date(startDate).toISOString();
      const end = new Date(endDate).toISOString();

      createMember({ ...data, startDate: start, endDate: end });
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <ContentModal title="일정 등록" desc="일정을 등록해주세요." button={<Button>등록</Button>}>
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>제목</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>설명</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel htmlFor={field.name}>위치</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>이벤트유형</FormLabel>
                <Input id={field.name} {...field} />
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="churchId"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel htmlFor={field.name}>교회 선택</FormLabel>
                <FormSelect
                  filterCondition={
                    churches?.content.map((church) => ({ label: church.churchName, value: church.id.toString() })) ?? []
                  }
                  onChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString() ?? ''}
                  className="w-full"
                  placeholder="교회를 선택해주세요."
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <DatePickerForm
                id={field.name}
                fieldName={field.name}
                label={'시작일'}
                className="col-span-2"
                disabled={[{ before: new Date() }]}
              />
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <DatePickerForm
                id={field.name}
                fieldName={field.name}
                label={'종료일'}
                className="col-span-2"
                disabled={[{ before: new Date() }]}
              />
            )}
          />

          <FormField
            control={form.control}
            name="isAllDay"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 col-span-2">
                <Checkbox id={field.name} checked={field.value} onCheckedChange={field.onChange} />
                <FormLabel htmlFor={field.name}>하루종일</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>색상</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
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

          {/* <Button type="submit" size={'lg'} className="col-span-2" disabled={isPending}>
            등록하기
          </Button> */}
        </form>
      </Form>
    </ContentModal>
  );
};
