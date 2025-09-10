'use client';

import { TableViewer } from '@workspace/ui/components/table';
import { LoadingBtn } from '@workspace/ui/components/button';
import { type BoardEntity } from '@workspace/http/must/board';

import { ContentLayout, GridFilterLayout, PaginationLayout } from '@/shared/components/layout';
import { useGetChurchCommunities, useDeleteChurchCommunity } from '@/domains/church/hooks';
import { CHURCH_COMMUNITY_COLUMNS } from '@/config/colums/church';
import { LinkButton } from '@/shared/components/ui';
import { ADMIN_PATH, ROUTES_PATH } from '@/config/config-map';

export function CommunityScreen({ filters }: { filters: BoardEntity.BoardParams }) {
  const { data, isPending } = useGetChurchCommunities(filters);
  const { mutateAsync: deleteChurchCommunity, isPending: isDeleting } = useDeleteChurchCommunity();

  return (
    <ContentLayout>
      <PaginationLayout initialPage={Number(filters.page)} size={filters.size} totalPages={data?.totalPages ?? 0}>
        <TableViewer
          data={data?.content ?? []}
          columns={CHURCH_COMMUNITY_COLUMNS}
          renderItem={({ getSelectedRowModel }) => (
            <GridFilterLayout
              right={
                <>
                  <LoadingBtn
                    variant="secondary"
                    // onClick={() => handleDelete(getSelectedRowModel().rows.map((row) => row.original.id))}
                    isLoading={isDeleting}
                    disabled={!getSelectedRowModel().rows.length}
                  >
                    게시판 삭제
                  </LoadingBtn>
                  <LinkButton asChild href={'./create'}>
                    게시판 등록
                  </LinkButton>
                </>
              }
            />
          )}
        />
      </PaginationLayout>
    </ContentLayout>
  );
}
