import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/form';
import { cn } from '@workspace/ui/lib';

interface FilterSelectProps {
  filterCondition: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const FormSelect = ({
  filterCondition,
  onChange,
  value,
  className,
  placeholder,
  disabled = false,
}: FilterSelectProps) => {
  return (
    <Select disabled={disabled} onValueChange={(e) => e && onChange(e)} value={value ?? 'ALL'}>
      <SelectTrigger className={cn('h-10 font-semibold', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent position="popper">
        {/* {placeholder && (
          <SelectItem value={'ALL'} className="font-semibold" disabled>
            {placeholder}
          </SelectItem>
        )} */}
        {filterCondition?.map(({ label, value }) => (
          <SelectItem key={label + value} value={value} className="font-semibold">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
