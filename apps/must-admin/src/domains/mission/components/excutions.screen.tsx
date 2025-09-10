'use client';

import { ContentLayout, GridFilterLayout } from '@/shared/components/layout';
import { useGetMissionExecutions } from '../hooks';
import { TableViewer } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import { MISSION_EXECUTION_COLUMNS } from '@/config/colums/mission';

export const MissionExecutionScreen = () => {
  const { data, isPending } = useGetMissionExecutions({
    page: '0',
    size: '100',
  });

  console.log(data);

  return (
    <ContentLayout>
      <TableViewer
        data={data?.content ?? []}
        columns={MISSION_EXECUTION_COLUMNS}
        renderItem={({ getSelectedRowModel }) => {
          return (
            <GridFilterLayout
            // right={
            //   <>
            //     <Button
            //       variant="secondary"
            //       onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
            //       disabled={!getSelectedRowModel().rows.length || isDeleting}
            //     >
            //       템플릿 삭제
            //     </Button>
            //     {/* <CreateMissionTemplateModal />
            //     <UpdateMissionTemplateModal data={table.getSelectedRowModel().rows[0].original} /> */}
            //   </>
            // }
            />
          );
        }}
      />
    </ContentLayout>
  );
};
