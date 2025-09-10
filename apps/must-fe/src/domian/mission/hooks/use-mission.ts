'use client';

import { useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/navigation';

import { type MissionEntity } from '@workspace/http/must/mission';

import { useCompleteMissionMutation } from './use-mutations';

function getInitialForm(mission: MissionEntity.MissionScheduleRes) {
  return {
    scheduleId: mission.id,
    missionId: mission.templateId,
    excutionText: '',
    isRightAnswer: false,
  };
}

export const useCompleteMission = (mission: MissionEntity.MissionScheduleRes) => {
  const [open, setOpen] = useState(false);

  const { replace } = useRouter();

  const [form, setForm] = useReducer(
    (state: MissionEntity.CompleteMission, action: Partial<MissionEntity.CompleteMission>) => {
      return {
        ...state,
        ...action,
      };
    },
    getInitialForm(mission),
  );

  const { mutateAsync: completeMission, isPending } = useCompleteMissionMutation();

  const onSubmit = async (isRightAnswer: boolean, excutionText: string) => {
    setForm({
      excutionText,
      isRightAnswer,
    });

    // setOpen(true);
    await completeMission({ ...form, isRightAnswer, excutionText }).then(() => {
      replace(`/mission/complete?result=${isRightAnswer ? 'success' : 'fail'}`);
    });
  };

  useEffect(() => {
    if (!open) {
      setForm(getInitialForm(mission));
    }
  }, [open]);

  return {
    open,
    setOpen,
    form,
    onSubmit,
    isPending,
  };
};
