'use client';

import { cn } from '@workspace/ui/lib';
import { Text } from '@workspace/ui/components/text';
import { Spacing } from '@workspace/ui/components/box';
import { LoadingBtn } from '@workspace/ui/components/button';
import { Label, RadioGroup, RadioGroupItem } from '@workspace/ui/components/form';

import { useAdditionalChurch } from '../../hooks';

// ----------------------------------------------------------------------

export const AdditionalChurchForm = ({ memberId }: { memberId: number }) => {
  const { churchList, selectedChurch, handleSelectChurch, handleUpdateChurch, isPending } = useAdditionalChurch();

  return (
    <>
      <main className="px-5 pt-[50px]">
        <Text as="p" className="text-2xl font-bold mb-2">
          소속 교회의 <br />
          정보를 알려주세요
        </Text>
        <Text as="p" className="text-xs text-gray-500">
          맞춤형 퀴즈 정보를 제공하기 위해 소속 교회의 정보가 필요해요
        </Text>

        <Spacing size={70} />

        <div className="rounded-lg border border-gray-200 px-3 py-2 h-[250px] overflow-y-auto">
          <RadioGroup onValueChange={handleSelectChurch} className="gap-0">
            {churchList?.content?.map(({ id, churchName, address }) => (
              <div
                key={id}
                className={cn(
                  'w-full flex gap-3 items-center p-2 overflow-hidden rounded-md transition-all duration-300',
                  selectedChurch === id.toString() && 'bg-gray-100',
                )}
              >
                <RadioGroupItem id={churchName} value={id.toString()} />
                <Label htmlFor={churchName} className="font-semibold flex-1 flex gap-2 items-center">
                  {churchName}

                  <Text as="p" className="text-[10px] text-gray-500 truncate flex-1">
                    {address}
                  </Text>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Spacing size={70} />

        <LoadingBtn
          size={'full'}
          onClick={handleUpdateChurch(memberId, Number(selectedChurch))}
          disabled={!selectedChurch}
          isLoading={isPending}
        >
          선택하기
        </LoadingBtn>
      </main>
    </>
  );
};
