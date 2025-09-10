'use client';

import { notFound } from 'next/navigation';
import { domAnimation, LazyMotion } from 'motion/react';

import { Spacing } from '@workspace/ui/components/box';
import type { MissionEntity } from '@workspace/http/must/mission';

import { BackBtnHeader } from '@/shared/components/header';
// import { MissionStepper } from './mission-stepper';
import { DailyMissionForm } from './missions';
import { MissionDoneModal } from './result.modal';

// ------------------------------------------------------------

export const DailyMissionScreen = ({ missionData }: { missionData?: MissionEntity.MissionScheduleRes }) => {
  if (!missionData) return notFound();
  // // ! 로딩 용
  return (
    <>
      <BackBtnHeader />
      <main className="pt-[50px] px-8">
        {/* <Spacing size={10} /> */}
        {/* <MissionStepper steps={[1, 2, 3].map((item, idx) => idx + 1) ?? []} initialStep={1} /> */}
        <Spacing size={50} />
        {/* <Text as="p" className="text-xl font-semibold text-center">
          퀴즈 도전 중
        </Text> */}
        <LazyMotion features={domAnimation}>
          <DailyMissionForm data={missionData} />
        </LazyMotion>
        <MissionDoneModal done={!!missionData.isExecution} />
      </main>
    </>
  );
};

// templateMissionType -> MULTI

// templateMultipleChoice -> include 'true' -> true

// ox, 객관식 구분
