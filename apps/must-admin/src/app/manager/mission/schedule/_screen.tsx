// 'use client';

// import { Card, CardContent } from '@workspace/ui/components/box';
// import { TableViewer } from '@workspace/ui/components/table';
// import { useGetMissionSchedules, useMissionsQuery } from '@workspace/http/must/mission';
// import { MISSION_SCHEDULE_COLUMNS } from '@/src/config/colums/mission';
// import { CreateMissionScheduleModal } from './_components/create-modal';
// import { GridOptionLayout } from '@/src/components/box/grid-option';
// import { AuthEntity } from '@workspace/http/must/auth';

// export default function MissionScheduleScreen({ userInfo }: { userInfo: AuthEntity.UserInfo }) {
//   const { data, isLoading, isPending } = useGetMissionSchedules({});

//   return (
//     <Card className="w-full h-full">
//       <CardContent>
//         {isLoading ? null : (
//           <TableViewer
//             data={data?.content ?? []}
//             columns={MISSION_SCHEDULE_COLUMNS}
//             renderItem={(table) => {
//               return (
//                 <GridOptionLayout>
//                   <CreateMissionScheduleModal churchId={userInfo.churchId} />
//                 </GridOptionLayout>
//               );
//             }}
//           />
//         )}
//       </CardContent>
//     </Card>
//   );
// }

// // 테이블 / 등록 및 삭제 기능 / 수정 기능
