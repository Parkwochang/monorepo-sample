'use client';

import { type ChurchEntity } from '@workspace/http/must/church';
import { Spacing } from '@workspace/ui/components/box';

import { DeferredLayout } from '@/shared/components/layout';
import { CommunityLoading, IconLink, ScheduleLoading } from '@/shared/components/box';
import { ChurchInfo } from './dashboard';
import { ScheduleBox, TodayScheduleBox } from './schedule';
import { CommunityBox } from './community';
import { useGetCommunitiesQuery, useGetSchedulesQuery } from '../hooks';
import { NavFooter } from '@/shared/components/footer';
import { fDate } from '@/lib/helpers';

// ----------------------------------------------------------------------

export const DashboardScreen = ({ myChurch }: { myChurch: ChurchEntity.Church }) => {
  const { data: scheduleData, isFetching: isScheduleFetching } = useGetSchedulesQuery({
    page: '0',
    size: '20',
    searchStartDate: fDate(new Date()),
  });

  const { data: communityData, isFetching: isCommunityFetching } = useGetCommunitiesQuery({ page: '0', size: '5' });

  return (
    <>
      <main className="pb-[100px] min-h-dvh bg-[#FCFBFC]">
        <ChurchInfo myChurch={myChurch} />
        <Spacing size={20} />

        <TodayScheduleBox />
        <Spacing size={30} />

        <IconLink href="/sunday/schedule" title="일정" />
        <Spacing size={10} />

        <DeferredLayout loading={isScheduleFetching} fallback={<ScheduleLoading />}>
          <ScheduleBox scheduleData={scheduleData?.content} />
        </DeferredLayout>
        <Spacing size={20} />

        <IconLink href="/sunday/community" title="커뮤니티" />
        <Spacing size={10} />

        <DeferredLayout loading={isCommunityFetching} fallback={<CommunityLoading />}>
          <CommunityBox communityData={communityData?.content} />
        </DeferredLayout>
        <Spacing size={20} />

        <NavFooter />
      </main>
    </>
  );
};
