'use client';

import { useForm } from 'react-hook-form';
import type { DefaultValues, FieldValues, UseFormProps } from 'react-hook-form';

// ----------------------------------------------------------------------

interface FormProps<TFieldValues extends FieldValues> extends UseFormProps<TFieldValues> {
  defaultValues: DefaultValues<TFieldValues>;
  // values: TFieldValues;
}

// ! schema와 디폴트 폼에 대해서 해당 코어에서 필요하나?

export const useDefaultForm = <T extends FieldValues>(props?: FormProps<T>) => {
  const form = useForm<T>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resetOptions: { keepDefaultValues: true },
    ...props,
  });

  return form;
};

export * from 'react-hook-form';

// mode: Mode;
// disabled: boolean;
// reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
// defaultValues: DefaultValues<TFieldValues> | AsyncDefaultValues<TFieldValues>;
// values: TFieldValues;
// errors: FieldErrors<TFieldValues>;
// resetOptions: Parameters<UseFormReset<TFieldValues>>[1];
// resolver: Resolver<TFieldValues, TContext, TTransformedValues>;
// context: TContext;
// shouldFocusError: boolean;
// shouldUnregister: boolean;
// shouldUseNativeValidation: boolean;
// progressive: boolean;
// criteriaMode: CriteriaMode;
// delayError: number;
// formControl?: Omit<UseFormReturn<TFieldValues, TContext, TTransformedValues>, 'formState'>;
