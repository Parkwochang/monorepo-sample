'use client';

import { useFormContext } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

import { cn } from '@workspace/ui/lib';
import { Button } from '@workspace/ui/components/button';
import { Calendar } from '@workspace/ui/components/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/modal';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';

// ----------------------------------------------------------------------

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'defaultChecked'> {
  fieldName: string;
  label?: string;
  disabled?: React.ComponentProps<typeof Calendar>['disabled'];
  className?: string;
}

export function DatePickerForm({ fieldName, label, disabled, className, ...props }: DatePickerProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={cn('flex flex-col', className)}>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[240px] pl-3 h-[46px] text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    className,
                  )}
                >
                  {field.value ? format(field.value, 'PPP', { locale: ko }) : <span>날짜를 선택해주세요</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
              <Calendar
                mode="single"
                locale={ko}
                selected={field.value}
                onSelect={(value) => value && field.onChange(format(value, 'yyyy-MM-dd', { locale: ko }))}
                disabled={disabled ? disabled : [{ after: new Date() }]}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          {/* <FormDescription>Your date of birth is used to calculate your age.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// ! 기본 달력
// export function DatePicker({ defaultDate, changeForm, disabled, ...props }: DatePickerProps) {
//   const [date, setDate] = useState<Date | undefined>(
//     defaultDate ? parse(defaultDate, 'yyyy-MM-dd', new Date()) : undefined,
//   );

//   const handleDateChange = (value: Date | undefined) => {
//     if (value) {
//       setDate(pre => (value ? value : pre));

//       changeForm && changeForm(format(value, 'yyyy-MM-dd'));
//     }
//   };

//   useEffect(() => {
//     // if (defaultDate) {
//     //   setDate(pre => parse(defaultDate, 'yyyy-MM-dd', new Date()));
//     // }
//     defaultDate ? setDate(parse(defaultDate, 'yyyy-MM-dd', new Date())) : setDate(undefined);
//   }, [defaultDate]);

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={'outline'}
//           className={cn(
//             'w-[240px] justify-between text-left font-semibold rounded-[6px]',
//             !date && 'text-muted-foreground',
//             props.className,
//           )}
//         >
//           {date ? format(date, 'PPP', { locale: ko }) : <span></span>}
//           <CalendarIcon className='ml-2 h-4 w-4' />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className='w-auto p-0' align='start'>
//         <Calendar
//           mode='single'
//           initialFocus
//           locale={ko}
//           defaultMonth={date}
//           disabled={disabled ? disabled : [{ after: new Date() }]}
//           selected={date}
//           onSelect={handleDateChange}
//           classNames={
//             {
//               // head_row: "flex bg-[#016FD8]",
//               // head_cell: 'text-white rounded-md w-8 font-normal text-[0.8rem]'
//             }
//           }
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }
