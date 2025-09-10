import * as m from 'motion/react-m';

import { CustomIcon, Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';
import { type MissionEntity } from '@workspace/http/must/mission';

// ----------------------------------------------------------------------

interface OXQuizFormProps {
  mission: MissionEntity.MissionScheduleRes;
  onComplete: (isRight: boolean, excutionText: string) => void;
}

export const OXQuizForm = ({ mission, onComplete }: OXQuizFormProps) => {
  const { templateDescription, isExecution, templateRightAnswer } = mission;

  if (isExecution) return null;

  const handleComplete = (excutionText: string) => () => {
    onComplete(templateRightAnswer === excutionText, excutionText);
  };

  return (
    <>
      <m.div
        className="flex gap-2"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Text className="text-xl text-blue-500 font-semibold">Q.</Text>
        <Text size="xl" className="text-[#333] font-normal">
          {templateDescription}
        </Text>
      </m.div>
      <Spacing size={70} />
      <m.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          ease: 'easeInOut',
          duration: 0.5,
          y: { duration: 0.5, delay: 0.1 },
        }}
      >
        <div
          className="w-full py-10 rounded-3xl bg-blue-500 flex-center active:scale-95 transition-all"
          onClick={handleComplete('true')}
        >
          {/* bg-[#e1f0ff] */}
          <CustomIcon name="Circle" strokeWidth={4} size={60} /* stroke="blue" */ className="text-white" />
        </div>

        <div
          className="w-full py-10 rounded-3xl bg-red-400 flex-center active:scale-95 transition-all"
          onClick={handleComplete('false')}
        >
          {/* bg-[#e1f0ff] */}
          <CustomIcon name="X" strokeWidth={4} size={60} /* stroke="blue" */ className="text-white" />
        </div>
      </m.div>
    </>
  );
};
