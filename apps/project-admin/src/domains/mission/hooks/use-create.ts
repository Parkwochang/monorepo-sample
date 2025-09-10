'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CreateMissionDto, CreateMissionScheduleDto } from '@workspace/http/must/mission';

import { useCreateMissionMutation, useCreateMissionScheduleMutation } from './mutations';
import { CREATE_MISSION_FORM, CREATE_MISSION_SCHEDULE_FORM } from '@/config/form';

// ----------------------------------------------------------------------
// ! 미션 템플릿

export const useCreateMissionTemplate = () => {
  const form = useForm({
    defaultValues: CREATE_MISSION_FORM,
    resolver: zodResolver(CreateMissionDto),
  });

  const { mutateAsync: createMission, isPending } = useCreateMissionMutation();

  const missionTypeObserver = useWatch({ control: form.control, name: 'missionType' });
  const missionKindTypeObserver = useWatch({ control: form.control, name: 'missionKindType' });

  const onSubmit = form.handleSubmit(
    (data) => {
      const { missionType, missionKindType, rightAnswer, ...restData } = data;

      createMission({
        ...restData,
        missionType,
        ...(missionKindType === 'OX' && { multipleChoice: 'true,false' }),
        ...(missionType === 'MULTI' && { rightAnswer }),
      });
    },
    (error) => {
      console.log(error);
    },
  );

  return {
    form,
    onSubmit,
    isPending,
    missionTypeObserver,
    missionKindTypeObserver,
  };
};

// ----------------------------------------------------------------------
// ! 미션 일정

export const useCreateMissionSchedule = () => {
  const form = useForm({
    defaultValues: CREATE_MISSION_SCHEDULE_FORM,
    resolver: zodResolver(CreateMissionScheduleDto),
  });

  const { mutateAsync: createMissionSchedule, isPending } = useCreateMissionScheduleMutation();

  const onSubmit = form.handleSubmit(
    async (data) => {
      await createMissionSchedule(data);
    },
    (error) => {
      console.log(error);
    },
  );

  return {
    form,
    onSubmit,
    isPending,
  };
};
