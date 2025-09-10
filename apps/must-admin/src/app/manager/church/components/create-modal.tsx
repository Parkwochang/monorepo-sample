import { FormSelect } from '@/components/box';
import { ContentModal } from '@/components/modal/content-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { fDate, useDefaultForm } from '@repo/core/lib';
import { CreateChurchDto, useCreateChurch } from '@workspace/http/must/church';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { DatePickerForm } from '@workspace/ui/components/calendar';
import { Form, FormField, FormItem, FormLabel, FormMessage, Input } from '@workspace/ui/components/form';

export const CreateChurchModal = () => {
  const form = useDefaultForm({
    defaultValues: {
      churchName: '',
      pastorName: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      establishedDate: fDate(new Date()),
      latitude: '',
      longitude: '',
    },
    resolver: zodResolver(CreateChurchDto),
  });

  const { mutate: createMember, isPending } = useCreateChurch();

  const onSubmit = form.handleSubmit(
    (data) => {
      createMember(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <ContentModal
      title="교회 등록"
      desc="교회 등록 후 미션 등록 및 관리가 가능합니다."
      button={<Button>교회 등록</Button>}
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="churchName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>교회명</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pastorName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>담당 목사</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>주소</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel htmlFor={field.name}>전화번호</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>이메일</FormLabel>
                <Input id={field.name} {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name}>홈페이지</FormLabel>
                <Input id={field.name} {...field} />
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="establishedDate"
            render={({ field }) => (
              <DatePickerForm id={field.name} fieldName={field.name} label={'설립일'} className="col-span-2" />
            )}
          />
          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel htmlFor={field.name}>위도</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel htmlFor={field.name}>경도</FormLabel>
                <Input id={field.name} {...field} className="py-2 px-3" />
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingBtn
            type="submit"
            size={'lg'}
            className="col-span-2"
            disabled={form.formState.isValid}
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
