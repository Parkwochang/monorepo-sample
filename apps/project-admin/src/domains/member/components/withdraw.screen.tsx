'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { Button, LoadingBtn } from '@workspace/ui/components/button';
import { type WithdrawalEntity } from '@workspace/http/must/withdrawal';

import { ContentLayout, GridFilterLayout, PaginationLayout } from '@/shared/components/layout';
import { WITHDRAWAL_COLUMNS } from '@/config/colums';
import { useGetWithdrawals } from '../hooks';
import { useDeleteAdminWithdrawal } from '../hooks/use-delete';

export function WithdrawScreen({ filters }: { filters: WithdrawalEntity.WithdrawalParams }) {
  const { data, isPending } = useGetWithdrawals(filters);
  const { handleDelete, isPending: isDeleting } = useDeleteAdminWithdrawal();

  return (
    <ContentLayout>
      <PaginationLayout initialPage={Number(filters.page)} size={filters.size} totalPages={data?.totalPages ?? 0}>
        <TableViewer
          data={data?.content ?? []}
          columns={WITHDRAWAL_COLUMNS}
          renderItem={({ getSelectedRowModel }) => (
            <GridFilterLayout
              right={
                <>
                  <LoadingBtn
                    variant="secondary"
                    onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
                    isLoading={isDeleting}
                    disabled={!getSelectedRowModel().rows.length}
                  >
                    요청 삭제
                  </LoadingBtn>
                  {/* <LinkButton asChild href={ADMIN_PATH.memberCreate}>
                  회원 등록
                </LinkButton> */}
                </>
              }
            />
          )}
        />
      </PaginationLayout>
    </ContentLayout>
  );
}
