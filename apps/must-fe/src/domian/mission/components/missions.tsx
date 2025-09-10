import { type MissionEntity } from '@workspace/http/must/mission';

import { MultipleQuizForm } from './multiple-form';
import { OXQuizForm } from './ox-form';
import { useCompleteMission } from '../hooks';

// ------------------------------------------------------------

export const DailyMissionForm = ({ data }: { data: MissionEntity.MissionScheduleRes }) => {
  const { templateMissionType, templateMultipleChoice } = data;

  if (templateMissionType !== 'MULTI') return null;

  const isOX = templateMultipleChoice?.includes('true');
  const { open, setOpen, form, onSubmit, isPending } = useCompleteMission(data);

  return (
    <>
      {isOX ? (
        <OXQuizForm mission={data} onComplete={onSubmit} />
      ) : (
        <MultipleQuizForm mission={data} onComplete={onSubmit} />
      )}
    </>
  );
};
