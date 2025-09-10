'use client';

import { useState, useCallback } from 'react';

import { getCookie, setCookie, deleteCookie as delCookie } from '@repo/utils';

// ----------------------------------------------------------------------

export function useCookie<ValueType>(name: string, defaultValue: ValueType) {
  const [value, setValue] = useState(() => {
    const cookie = getCookie(name, defaultValue);

    return typeof cookie === 'function' ? cookie() : cookie;
  });

  const updateCookie = useCallback(
    (newValue: any, options: any) => {
      setCookie(name, newValue, options);
      setValue(newValue);
    },
    [name],
  );

  const deleteCookie = useCallback(() => {
    delCookie(name);
    setValue(defaultValue);
  }, [name]);

  return [value, updateCookie, deleteCookie];
}
