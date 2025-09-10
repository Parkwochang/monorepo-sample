'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { MemberEntity } from '@workspace/http/must/member';
import { Button } from '@workspace/ui/components/button';

import { ContentLayout, GridFilterLayout, PaginationLayout } from '@/shared/components/layout';
import { LinkButton } from '@/shared/components/ui';
import { ADMIN_PATH } from '@/config/config-map/path';
import { MEMBER_COLUMNS } from '@/config/colums';

import { useDeleteAdminMember, useGetMembers } from '../hooks';
import { EllipsisPagination } from '@workspace/ui/components/navigator';

interface MemberScreenProps {
  filters: MemberEntity.MemberParams;
}

export const MemberScreen = ({ filters }: MemberScreenProps) => {
  const { data, isPending } = useGetMembers(filters);
  const { handleDelete, isPending: isDeleting } = useDeleteAdminMember();

  return (
    <ContentLayout>
      <PaginationLayout initialPage={Number(filters.page)} size={filters.size} totalPages={data?.totalPages ?? 0}>
        <TableViewer
          data={data?.content ?? []}
          columns={MEMBER_COLUMNS}
          renderItem={({ getSelectedRowModel }) => (
            <GridFilterLayout
              right={
                <>
                  <Button
                    variant="secondary"
                    onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
                    disabled={!getSelectedRowModel().rows.length || isDeleting}
                  >
                    회원 삭제
                  </Button>
                  <LinkButton asChild href={ADMIN_PATH.memberCreate}>
                    회원 등록
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
