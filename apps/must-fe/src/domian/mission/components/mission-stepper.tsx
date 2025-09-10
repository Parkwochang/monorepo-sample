'use client';

import { useState } from 'react';

import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from '@workspace/ui/components/box';
import { uuids4 } from '@/lib/utils';

interface MissionStepperProps {
  steps: number[];
  initialStep?: number;
}

export function MissionStepper({ steps, initialStep = 1 }: MissionStepperProps) {
  if (steps.length < 2) return null;

  const [currentStep, setCurrentStep] = useState(initialStep);

  return (
    <div className="mx-auto max-w-xl space-y-8 text-center">
      <div className="flex items-center gap-2">
        <Stepper value={currentStep} onValueChange={setCurrentStep} className="gap-1">
          {steps.map((step, idx) => (
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
    </div>
  );
}
