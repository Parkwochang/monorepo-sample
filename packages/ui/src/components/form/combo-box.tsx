'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@workspace/ui/lib';
import { Button } from '@workspace/ui/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/modal';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/modal';

interface ComboboxProps extends React.ComponentProps<typeof Popover> {
  selectObj: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function Combobox({
  selectObj,
  value,
  onValueChange,
  placeholder = 'Select',
  disabled,
  ...props
}: ComboboxProps) {
  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="w-[200px] justify-between">
          {value ? value /* selectObj.find((select) => select.value === value)?.label */ : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>not found.</CommandEmpty>
            <CommandGroup>
              {selectObj.map((select) => (
                <CommandItem
                  key={select.value}
                  value={select.value}
                  disabled={disabled}
                  onSelect={(currentValue: string) => {
                    onValueChange(currentValue === value ? '' : currentValue);
                  }}
                >
                  {select.label}
                  <Check className={cn('ml-auto', value === select.value ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
