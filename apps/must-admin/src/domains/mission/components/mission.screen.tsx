'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { type MissionEntity } from '@workspace/http/must/mission';

import { ContentLayout, GridFilterLayout } from '@/shared/components/layout';
import { MISSION_COLUMNS } from '@/config/colums/mission';
import { useDeleteMissionTemplate, useGetMissions } from '../hooks';
import { CreateMissionTemplateModal } from './create-template';

export const MissionScreen = ({ filters }: { filters: MissionEntity.MissionParams }) => {
  const { data, isPending } = useGetMissions(filters);
  const { handleDelete, isPending: isDeleting } = useDeleteMissionTemplate();

  return (
    <ContentLayout>
      <TableViewer
        data={data?.content ?? []}
        columns={MISSION_COLUMNS}
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
                    템플릿 삭제
                  </Button>
                  <CreateMissionTemplateModal />
                  {/* <UpdateMissionTemplateModal data={table.getSelectedRowModel().rows[0].original} /> */}
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
