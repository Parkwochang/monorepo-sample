import Link from 'next/link';
import type { ColumnDef } from '@tanstack/react-table';

import type { ChurchEntity } from '@workspace/http/must/church';
import type { ScheduleEntity } from '@workspace/http/must/schedule';
import { type BoardEntity } from '@workspace/http/must/board';
import { Checkbox } from '@repo/ui/components/form';
import { cn } from '@repo/ui/lib';

import { ADMIN_PATH } from '../config-map/path';
import { fDateTime } from '@/lib/helpers';

export const CHURCH_COLUMNS: ColumnDef<ChurchEntity.Church>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => (
      <div className="h-full flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="h-full flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: '교회명',
    accessorKey: 'churchName',
    cell: ({ row }) => {
      return (
        <Link href={ADMIN_PATH.churchDetail(row.original.id)} className="underline">
          {row.original.churchName}
        </Link>
      );
    },
  },
  {
    header: '전화번호',
    accessorKey: 'phone',
  },
  {
    header: '주소',
    accessorKey: 'address',
  },
  {
    header: '설립일',
    accessorKey: 'establishedDate',
  },
  {
    header: '활성여부',
    accessorKey: 'isActive',
    cell: ({ row }) => {
      return (
        <div className={cn(row.original.isActive ? 'text-green-500' : 'text-red-500')}>
          {row.original.isActive ? '활성' : '비활성'}
        </div>
      );
    },
  },
];

export const CHURCH_SCHEDULE_COLUMNS: ColumnDef<ScheduleEntity.ScheduleResponse>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => (
      <div className="h-full flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="h-full flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: '제목',
    accessorKey: 'title',
  },
  {
    header: '설명',
    accessorKey: 'description',
  },
  {
    header: '시작일',
    accessorKey: 'startDate',
    cell: ({ row }) => {
      return <div>{fDateTime(row.original.startDate, 'yyyy-MM-dd HH:mm')}</div>;
    },
  },
  {
    header: '종료일',
    accessorKey: 'endDate',
    cell: ({ row }) => {
      return <div>{fDateTime(row.original.endDate, 'yyyy-MM-dd HH:mm')}</div>;
    },
  },
  {
    header: '위치',
    accessorKey: 'location',
  },
  {
    header: '이벤트타입',
    accessorKey: 'eventType',
  },
  {
    header: '교회',
    accessorKey: 'churchName',
  },
];

export const CHURCH_COMMUNITY_COLUMNS: ColumnDef<BoardEntity.BoardResponse>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => (
      <div className="h-full flex items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="h-full flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: '제목',
    accessorKey: 'title',
  },
  {
    header: '내용',
    accessorKey: 'content',
    cell: ({ row }) => {
      return <div className="max-w-[500px] truncate">{row.original.content}</div>;
    },
  },
  {
    header: '교회',
    accessorKey: 'churchName',
  },
  {
    header: '조회수',
    accessorKey: 'viewCount',
  },
  {
    header: '댓글수',
    accessorKey: 'commentCount',
  },
  {
    header: '작성일',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return <div>{fDateTime(row.original.createdAt)}</div>;
    },
  },
];
