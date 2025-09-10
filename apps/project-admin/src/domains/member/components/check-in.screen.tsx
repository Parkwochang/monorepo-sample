'use client';

import { TableViewer } from '@workspace/ui/components/table';

import { ContentLayout } from '@/shared/components/layout';
import { CHECK_IN_COLUMNS } from '@/config/colums';
import { useGetCheckIns } from '../hooks';

export function CheckInScreen() {
  const { data, isLoading } = useGetCheckIns({});

  return (
    <ContentLayout>
      <TableViewer data={data?.content ?? []} columns={CHECK_IN_COLUMNS} />
    </ContentLayout>
  );
}
