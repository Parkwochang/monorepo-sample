import { DailyMissionScreen } from '@/domian/mission/components';
import { getMissionSchedulesTodayServer } from '@/domian/mission/service';

export const dynamic = 'force-dynamic';

export default async function MissionPage() {
  const data = await getMissionSchedulesTodayServer();

  return <DailyMissionScreen missionData={data} />;
}

// function MissionSection({
//   data,
//   step,
//   setStep,
// }: {
//   data: MissionEntity.Mission;
//   step: number;
//   setStep: (step: number) => void;
// }) {
//   const { missionType, rightAnswer, multipleChoice } = data;
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [result, setResult] = useState(false);

//   const form = useDefaultForm({
//     defaultValues: {
//       templateId: data.id,
//       churchId: data.churchId,
//       weekStartDate: fDate(new Date()),
//       weekEndDate: fDate(new Date()),
//       missionOrder: step,
//       execution: '',
//       isRightAnswer: false,
//     },
//   });

//   const { mutate: completeMission } = useCompleteMission();

//   useEffect(() => {
//     form.reset({
//       templateId: data.id,
//       churchId: data.churchId,
//       weekStartDate: fDate(new Date()),
//       weekEndDate: fDate(new Date()),
//       missionOrder: step,
//       execution: '',
//       isRightAnswer: false,
//     });
//   }, [step]);

//   const onSubmit = form.handleSubmit((data) => {
//     console.log(data);
//     setResult(data.execution === rightAnswer);
//     setIsSubmit(true);
//   });

//   const handleNext = () => {
//     setIsSubmit(false);
//     setStep(step + 1);
//     // form.reset();
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={onSubmit} className="flex-center flex-col gap-3 justify-between">
//         <Text as="p" size={'xl'} className="font-bold">
//           {data.title}
//         </Text>

//         <FormField
//           control={form.control}
//           name="execution"
//           render={({ field }) => (
//             <>
//               <MissionDescription description={data.description} answer={field.value} />
//               {missionType === 'MULTI' && (
//                 <MissionTypeMulti
//                   multipleChoice={multipleChoice?.split(',') ?? []}
//                   value={field.value}
//                   onChange={field.onChange}
//                 />
//               )}
//               {missionType === 'FILL' && <MissionTypeFill value={field.value} onChange={field.onChange} />}
//               {missionType === 'WRITE' && <MissionTypeWrite value={field.value} onChange={field.onChange} />}
//             </>
//           )}
//         />

//         <Button
//           size="full"
//           className=" bg-[#FFDD88] hover:bg-[#FFDD88]/80 text-[#333] font-semibold"
//           disabled={!form.formState.isDirty}
//           // onClick={() => setStep(step + 1)}
//         >
//           미션 제출하기
//         </Button>
//       </form>
//       <ResultModal isOpen={isSubmit} onOpenChange={handleNext} result={result} />
//     </Form>
//   );
// }
