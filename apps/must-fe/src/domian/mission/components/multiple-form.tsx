import * as m from 'motion/react-m';
import { AnimatePresence } from 'motion/react';

import { Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';
import { type MissionEntity } from '@workspace/http/must/mission';

interface MultipleQuizFormProps {
  mission: MissionEntity.MissionScheduleRes;
  onComplete: (isRight: boolean, excutionText: string) => void;
}

// ! 미션 수행 -> scheduleId, excutionText, isRightAnswer

export function MultipleQuizForm({ mission, onComplete }: MultipleQuizFormProps) {
  const { templateDescription, templateMultipleChoice, isExecution, templateRightAnswer } = mission;

  if (isExecution) return null;

  const handleComplete = (excutionText: string) => () => {
    onComplete(templateRightAnswer === excutionText, excutionText);
  };

  return (
    <>
      <m.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
      >
        <Text className="text-xl text-blue-500 font-semibold">Q.</Text>
        <Text size="xl" className="text-[#333] font-normal">
          {templateDescription}
        </Text>
      </m.div>

      <Spacing size={70} />
      <ul className="flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {templateMultipleChoice?.split(',').map((item, idx) => (
            <m.div
              key={item}
              className="w-full rounded-2xl border-2 bg-gray-100 py-2 px-3 active:scale-95 transition-all"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1 * idx,
              }}
              onClick={handleComplete(item)}
            >
              <Text size="lg" className="text-[#333] font-medium">
                {idx + 1}. {item}
              </Text>
            </m.div>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}
