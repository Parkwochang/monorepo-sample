'use client';

import Image from 'next/image';
import { groupBy, sortBy } from 'es-toolkit';

import { Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';
import { type ScheduleEntity } from '@workspace/http/must/schedule';

import { fDate } from '@/lib/helpers';
import Link from 'next/link';
import { PATH } from '@/config/config-map';

// ----------------------------------------------------------------------

export const ScheduleBox = ({ scheduleData }: { scheduleData?: ScheduleEntity.ScheduleResponse[] }) => {
  if (!scheduleData?.length)
    return (
      <Text as="p" size={'lg'} className="text-gray-500 px-5 py-3 text-center">
        등록된 일정이 없어요
      </Text>
    );

  const sortedData = sortBy(scheduleData, ['startDate']);

  const groupByDate = groupBy(sortedData, (item) => fDate(item.startDate));

  return (
    <div className="flex gap-3 overflow-auto py-2 px-5 no-scrollbar">
      {Object.entries(groupByDate).map(([date, schedules]) => (
        <ScheduleItem key={date} date={date} data={schedules} />
      ))}
    </div>
  );
};

export const TodayScheduleBox = () => {
  return (
    <>
      <div className="px-5">
        <div className="p-4 rounded-lg flex justify-between shadow-sm bg-white">
          <div>
            <Text as="p" size={'lg'} className="font-semibold">
              주일 예배
            </Text>
            <Text as="p" size={'sm'} className="text-gray-700">
              본당 대강당
            </Text>
          </div>

          <div className="flex flex-col gap-1 items-end">
            <Text className="rounded-full px-3 py-1 bg-purple-200 text-purple-700">Today</Text>
            <Text size={'sm'} className="text-gray-500">
              2025.08.25 10:00
            </Text>
          </div>
        </div>
      </div>

      <Spacing size={20} />

      <div className="grid grid-cols-2 gap-3 px-5">
        <Link href={PATH.sunday.chat} className="p-3 rounded-lg flex-center flex-col gap-2 shadow-sm bg-white">
          <Image src={'/images/ai.svg'} alt="" width={80} height={80} />
          <Text as="p" size={'lg'} className="font-semibold text-purple-500">
            AI 성경 해석
          </Text>
        </Link>
        <Link href={PATH.sunday.chat} className="p-3 rounded-lg flex-center flex-col gap-2 shadow-sm bg-white">
          <Image src={'/images/ai.svg'} alt="" width={80} height={80} />
          <Text as="p" size={'lg'} className="font-semibold text-purple-500">
            AI 성경 해석
          </Text>
        </Link>
      </div>
    </>
  );
};

export const ScheduleItem = ({ date, data }: { date: string; data: ScheduleEntity.ScheduleResponse[] }) => {
  return (
    <div className="shrink-0 w-[150px] h-[150px] rounded-lg shadow-sm p-3 flex flex-col justify-between bg-white">
      <Text className="font-semibold pb-5">{fDate(date, 'MM월 dd일')}</Text>
      <div className="flex-1">
        {data.map((item) => (
          <Text key={item.startDate} className="text-blue-400 truncate">
            {fDate(item.startDate, 'HH:mm')} {item.title}
          </Text>
        ))}
      </div>
    </div>
  );
};
