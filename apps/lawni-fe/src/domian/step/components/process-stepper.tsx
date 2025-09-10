'use client';

import { uuids4 } from '@/lib/utils';
import { Spacing, Stepper, StepperIndicator, StepperItem, StepperTrigger } from '@workspace/ui/components/box';
import { Text } from '@workspace/ui/components/text';

interface ProcessStepperProps {
  step?: number;
  totalStep?: number;
}

const STEP_LIST = [
  {
    title: '카테고리 선택',
    description: '사건 유형을 선택해주세요',
  },
  {
    title: '기본 정보',
    description: '사건 관련 정보를 입력해주세요',
  },
  {
    title: '완료',
    description: '상담이 완료 되었습니다',
  },
  {
    title: '요약 및 문서생성',
    description: '내용 확인 후 PDF 문서를 생성해드릴게요',
  },
] as const;

export const ProcessStepper = ({ step = 1, totalStep = 5 }: ProcessStepperProps) => {
  const { title, description } = STEP_LIST[step - 1]!;

  const stepList = Array.from({ length: totalStep }, (_, idx) => idx + 1);

  return (
    <div className="px-5 py-3 bg-white rounded-lg shadow-md">
      <Text as="p" size={'xl'}>
        {title}
      </Text>
      <Text as="p" size={'sm'}>
        {description}
      </Text>
      <Spacing size={10} />
      <Stepper value={step} onValueChange={() => {}}>
        {stepList.map((step, idx) => (
          <StepperItem key={uuids4()} step={step} className="flex-1">
            <StepperTrigger className="w-full flex-col items-start gap-2" asChild>
              <StepperIndicator asChild className="bg-border h-1 w-full">
                <span className="sr-only">{idx + 1}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
};
