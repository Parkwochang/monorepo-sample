'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { type MissionEntity } from '@workspace/http/must/mission';

import { ContentLayout, GridFilterLayout } from '@/shared/components/layout';
import { MISSION_SCHEDULE_COLUMNS } from '@/config/colums/mission';
import { useDeleteMissionSchedule, useGetMissionSchedules } from '../hooks';
import { CreateMissionScheduleModal } from './create-schedule';

export const MissionScheduleScreen = ({ filters }: { filters: MissionEntity.MissionParams }) => {
  const { data, isPending } = useGetMissionSchedules(filters);
  const { handleDelete, isPending: isDeleting } = useDeleteMissionSchedule();

  return (
    <ContentLayout>
      <TableViewer
        data={data?.content ?? []}
        columns={MISSION_SCHEDULE_COLUMNS}
        renderItem={({ getSelectedRowModel }) => {
          return (
            <GridFilterLayout
              right={
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
                    disabled={!getSelectedRowModel().rows.length || isDeleting}
                  >
                    미션 삭제
                  </Button>
                  <CreateMissionScheduleModal />
                  {/* <CreateMissionTemplateModal />
                  <UpdateMissionTemplateModal data={table.getSelectedRowModel().rows[0].original} /> */}
                </>
              }
            />
          );
        }}
      />
    </ContentLayout>
  );
};

// 테이블 / 등록 및 삭제 기능 / 수정 기능
