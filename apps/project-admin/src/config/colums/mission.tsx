import { ColumnDef } from '@tanstack/react-table';

import type { MissionEntity } from '@workspace/http/must/mission';
import { Checkbox } from '@workspace/ui/components/form';
import { fDate } from '@repo/core/lib';
import { cn } from '@workspace/ui/lib';

import { DIFFICULTY_LEVEL_MAP, MISSION_EXECUTION_STATUS_MAP, MISSION_TYPE_MAP } from '../config-map';
import Link from 'next/link';
import { ADMIN_PATH } from '../config-map/path';
import { ActiveStatusBtn, MissionStatusBtn } from '@/shared/components/ui';

// ----------------------------------------------------------------------
// ! 미션 템플릿

export const MISSION_COLUMNS: ColumnDef<MissionEntity.Mission>[] = [
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
    cell: ({ row }) => {
      return (
        <Link href={ADMIN_PATH.missionDetail(row.original.id)} className="underline">
          {row.original.title}
        </Link>
      );
    },
  },
  {
    header: '설명',
    accessorKey: 'description',
    cell: ({ row }) => {
      return <div className="max-w-[300px] truncate">{row.original.description}</div>;
    },
  },
  {
    header: '유형',
    accessorKey: 'missionType',
    cell: ({ row }) => {
      return <div>{MISSION_TYPE_MAP[row.original.missionType]}</div>;
    },
  },
  {
    header: '난이도',
    accessorKey: 'difficultyLevel',
    cell: ({ row }) => {
      return <div>{DIFFICULTY_LEVEL_MAP[row.original.difficultyLevel]}</div>;
    },
  },
  {
    header: '보상',
    accessorKey: 'talentReward',
  },
  {
    header: '생성일',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return <div>{fDate(row.original.createdAt)}</div>;
    },
  },
  {
    header: '수정일',
    accessorKey: 'updatedAt',
    cell: ({ row }) => {
      return <div>{fDate(row.original.updatedAt)}</div>;
    },
  },
  {
    header: '활성여부',
    accessorKey: 'isActive',
    cell: ({ row }) => <ActiveStatusBtn active={row.original.isActive} />,
  },
];

// ----------------------------------------------------------------------
// ! 미션 일정

export const MISSION_SCHEDULE_COLUMNS: ColumnDef<MissionEntity.MissionScheduleRes>[] = [
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
    header: '템플릿 제목',
    accessorKey: 'templateTitle',
  },
  {
    header: '템플릿 설명',
    accessorKey: 'templateDescription',
    cell: ({ row }) => {
      return <div className="">{row.original.templateDescription}</div>;
    },
  },

  {
    header: '템플릿 유형',
    accessorKey: 'templateMissionType',
    cell: ({ row }) => {
      return <div>{MISSION_TYPE_MAP[row.original.templateMissionType]}</div>;
    },
  },
  {
    header: '템플릿 난이도',
    accessorKey: 'templateDifficultyLevel',
    cell: ({ row }) => {
      return <div>{DIFFICULTY_LEVEL_MAP[row.original.templateDifficultyLevel]}</div>;
    },
  },
  {
    header: '미션 시작일',
    accessorKey: 'weekStartDate',
    cell: ({ row }) => {
      return <div>{fDate(row.original.weekStartDate)}</div>;
    },
  },
  {
    header: '미션 보상',
    accessorKey: 'templateTalentReward',
    cell: ({ row }) => {
      return <div>{row.original.templateTalentReward}T</div>;
    },
  },
];

// ----------------------------------------------------------------------
// ! 미션 수행 이력

export const MISSION_EXECUTION_COLUMNS: ColumnDef<MissionEntity.MissionExecutionRes>[] = [
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
    header: '수행자',
    accessorKey: 'memberName',
  },
  {
    header: '미션명',
    accessorKey: 'templateName',
  },
  {
    header: '보상',
    accessorKey: 'talentReward',
    cell: ({ row }) => {
      return <div>{row.original.talentReward}T</div>;
    },
  },
  {
    header: '상태',
    accessorKey: 'status',
    cell: ({ row }) => <MissionStatusBtn status={row.original.status} />,
  },
  {
    header: '교회',
    accessorKey: 'churchName',
  },
];
