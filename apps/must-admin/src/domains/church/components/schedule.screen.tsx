'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import type { ChurchEntity } from '@workspace/http/must/church/dto';

import { ContentLayout, GridFilterLayout } from '@/shared/components/layout';
import { LinkButton } from '@/shared/components/ui';
import { ADMIN_PATH } from '@/config/config-map/path';
import { CHURCH_COLUMNS, CHURCH_SCHEDULE_COLUMNS } from '@/config/colums/church';

import { useDeleteAdminChurchSchedule, useGetChurchSchedules } from '../hooks';

// ----------------------------------------------------------------------

interface ChurchScreenProps {
  filters: ChurchEntity.ChurchParam;
}

export const ChurchScheduleScreen = ({ filters }: ChurchScreenProps) => {
  const { data, isPending } = useGetChurchSchedules(filters);
  const { handleDelete, isPending: isDeleting } = useDeleteAdminChurchSchedule();

  return (
    <ContentLayout>
      <TableViewer
        data={data?.content ?? []}
        columns={CHURCH_SCHEDULE_COLUMNS}
        renderItem={({ getSelectedRowModel }) => (
          <GridFilterLayout
            right={
              <>
                <Button
                  variant="secondary"
                  onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
                  disabled={!getSelectedRowModel().rows.length || isDeleting}
                >
                  일정 삭제
                </Button>
                <LinkButton asChild href={ADMIN_PATH.memberCreate}>
                  일정 등록
                </LinkButton>
              </>
            }
          />
        )}
      />
    </ContentLayout>
  );
};
