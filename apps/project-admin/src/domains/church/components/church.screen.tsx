'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { Button } from '@workspace/ui/components/button';
import type { ChurchEntity } from '@workspace/http/must/church/dto';

import { ContentLayout, GridFilterLayout, PaginationLayout } from '@/shared/components/layout';
import { LinkButton } from '@/shared/components/ui';
import { ADMIN_PATH } from '@/config/config-map/path';
import { CHURCH_COLUMNS } from '@/config/colums/church';

import { useDeleteAdminChurch, useGetChurches } from '../hooks';

// ----------------------------------------------------------------------

interface ChurchScreenProps {
  filters: ChurchEntity.ChurchParam;
}

export const ChurchScreen = ({ filters }: ChurchScreenProps) => {
  const { data, isPending } = useGetChurches(filters);
  const { handleDelete, isPending: isDeleting } = useDeleteAdminChurch();

  return (
    <ContentLayout>
      <PaginationLayout initialPage={Number(filters.page)} size={filters.size} totalPages={data?.totalPages ?? 0}>
        <TableViewer
          data={data?.content ?? []}
          columns={CHURCH_COLUMNS}
          renderItem={({ getSelectedRowModel }) => (
            <GridFilterLayout
              right={
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
                    disabled={!getSelectedRowModel().rows.length || isDeleting}
                  >
                    교회 삭제
                  </Button>
                  <LinkButton asChild href={ADMIN_PATH.memberCreate}>
                    교회 등록
                  </LinkButton>
                </>
              }
            />
          )}
        />
      </PaginationLayout>
    </ContentLayout>
  );
};
