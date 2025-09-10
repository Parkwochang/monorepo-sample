'use client';

import { useState, useEffect } from 'react';

/**
 * 값의 변경을 지연시켜 깜빡거림을 방지하는 훅
 * @param value 감시할 값
 * @param delay 지연 시간 (기본값: 200ms)
 * @returns 지연된 값
 */
export function useDeferredValue<T>(value: T, delay: number = 200): T {
  const [deferredValue, setDeferredValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeferredValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return deferredValue;
}

/**
 * 로딩 상태를 지연시켜 깜빡거림을 방지하는 훅
 * @param loading 로딩 상태
 * @param delay 지연 시간 (기본값: 200ms)
 * @returns 지연된 로딩 상태
 */
export function useDeferredLoading(loading: boolean, delay: number = 200): boolean {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setShowLoading(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setShowLoading(false);
    }
  }, [loading, delay]);

  return showLoading;
}
