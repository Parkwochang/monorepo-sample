'use client';

import { EllipsisPagination } from '@workspace/ui/components/navigator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/form';
import { useCustomRouter } from '@workspace/ui/hooks';

interface PaginationProps {
  initialPage: number;
  size: string;
  totalPages?: number;
  paginationItemsToDisplay?: number;
  children: React.ReactNode;
}

export const PaginationLayout = ({
  initialPage,
  size,
  totalPages = 1,
  paginationItemsToDisplay,
  children,
}: PaginationProps) => {
  return (
    <>
      {children}
      <div className="grid grid-cols-3 items-center mt-10">
        <PaginationCntSelect size={size} />
        <EllipsisPagination
          initialPage={initialPage}
          totalPages={totalPages}
          paginationItemsToDisplay={paginationItemsToDisplay}
        />
      </div>
    </>
  );
};

function PaginationCntSelect({ size }: { size: string }) {
  const { query, push, pathname } = useCustomRouter();

  const handleSizeChange = (size: string) => {
    push({
      pathname,
      query: { ...query, size },
    });
  };

  return (
    <Select value={size} onValueChange={handleSizeChange}>
      <SelectContent position="popper">
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="40">40</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
      <SelectTrigger>
        <SelectValue placeholder="" />
      </SelectTrigger>
    </Select>
  );
}
