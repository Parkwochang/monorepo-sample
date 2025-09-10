import { Input, RadioGroup, RadioGroupItem, Textarea } from '@workspace/ui/components/form';
import { Label } from '@workspace/ui/components/label';
import { Text } from '@workspace/ui/components/text';

interface MissionTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export const MissionTypeWrite = ({ value, onChange }: MissionTypeProps) => {
  return <Input value={value} onChange={(e) => onChange(e.target.value)} />;
};

export const MissionTypeFill = ({ value, onChange }: MissionTypeProps) => {
  return <Textarea value={value} onChange={(e) => onChange(e.target.value)} />;
};

export const MissionTypeMulti = ({
  multipleChoice,
  value,
  onChange,
}: MissionTypeProps & { multipleChoice: string[] }) => {
  return (
    <div className="w-full">
      <RadioGroup value={value} onValueChange={(value) => onChange(value)}>
        {multipleChoice.map((choice) => (
          <div key={choice} className="flex gap-3 items-center">
            <RadioGroupItem value={choice} id={choice} className="size-6" />
            <Label htmlFor={choice} className="text-xl font-semibold">
              {choice}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export const MissionDescription = ({ description, answer }: { description: string; answer?: string }) => {
  const descriptionArr = description.split('[]') as [string, string] | [string];
  console.log(answer);
  if (descriptionArr.length === 1) {
    return (
      <Text as="p" size={'xl'} className="font-semibold">
        {description}
      </Text>
    );
  }

  return (
    <Text as="p" size={'xl'} className="font-semibold">
      {descriptionArr[0]}
      <Text
        as="span"
        size={'xl'}
        className="font-semibold bg-gray-200 rounded-md px-2 py-1 min-w-[50px] min-h-[36px] inline-block mx-1"
      >
        {answer}
      </Text>
      {descriptionArr[1]}
    </Text>
  );
};
