'use client';

import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';

import type { MemberEntity } from '@workspace/http/must/member';
import type { WithdrawalEntity } from '@workspace/http/must/withdrawal';
import type { CheckInEntity } from '@workspace/http/must/check-in';
import { Checkbox } from '@workspace/ui/components/form';

import { ROLE_MAP } from '../config-map';
import { ADMIN_PATH } from '../config-map/path';
import { fDateTime } from '@/lib/helpers';

export const MEMBER_COLUMNS: ColumnDef<MemberEntity.MemberRes>[] = [
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
    header: '이름',
    accessorKey: 'name',
    cell: ({ row }) => {
      return (
        <Link href={ADMIN_PATH.memberDetail(row.original.id)} className="underline">
          {row.original.name}
        </Link>
      );
    },
  },
  {
    header: '교회',
    accessorKey: 'churchName',
  },
  {
    header: '이메일',
    accessorKey: 'email',
  },
  {
    header: '역할',
    accessorKey: 'role',
    cell: ({ row }) => {
      return <div>{ROLE_MAP[row.original.role]}</div>;
    },
  },
  {
    header: '휴대폰',
    accessorKey: 'phone',
  },
  {
    header: '생년월일',
    accessorKey: 'birthDate',
  },
  {
    header: '활성여부',
    accessorKey: 'isActive',
    cell: ({ row }) => {
      return <div>{row.original.isActive ? '활성' : '비활성'}</div>;
    },
  },
];

export const CHECK_IN_COLUMNS: ColumnDef<CheckInEntity.CheckInRes>[] = [
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
    header: '이름',
    accessorKey: 'memberName',
  },
  {
    header: '출석 일자',
    accessorKey: 'checkDate',
  },
  {
    header: '출석 방법',
    accessorKey: 'checkMethod',
  },
  {
    header: '출석 위치',
    accessorKey: 'location',
  },
];

export const WITHDRAWAL_COLUMNS: ColumnDef<WithdrawalEntity.WithdrawalResponse>[] = [
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
    header: '이름',
    accessorKey: 'memberName',
  },
  {
    header: '출금 금액',
    accessorKey: 'amount',
  },
  {
    header: '출금 상태',
    accessorKey: 'statusName',
  },
  {
    header: '신청 일자',
    accessorKey: 'requestDate',
    cell: ({ row }) => {
      return <div>{fDateTime(row.original.requestDate, 'yyyy-MM-dd HH:mm')}</div>;
    },
  },
  {
    header: '출금 일자',
    accessorKey: 'approvalDate',
    cell: ({ row }) => {
      return <div>{fDateTime(row.original.approvalDate, 'yyyy-MM-dd HH:mm')}</div>;
    },
  },
];
