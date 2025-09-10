'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/form';
import { useGetChurches } from '@workspace/http/must/church';
import { cn } from '@workspace/ui/lib';

interface FilterSelectProps {
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const ChurchSelect = ({ onChange, className, placeholder, disabled = false }: FilterSelectProps) => {
  const { data: churches } = useGetChurches({
    page: '1',
    size: '1000',
  });

  return (
    <Select disabled={disabled} onValueChange={(e) => e && onChange(e)} defaultValue="">
      <SelectTrigger className={cn('font-semibold rounded-xl border-blue-500 w-full h-[50px]', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        {/* {placeholder && (
          <SelectItem value={'ALL'} className="font-semibold" disabled>
            {placeholder}
          </SelectItem>
        )} */}
        {churches?.content?.map(({ id, churchName }) => (
          <SelectItem key={churchName} value={id.toString()} className="font-semibold">
            {churchName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
