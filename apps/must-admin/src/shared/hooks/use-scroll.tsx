'use client';

import { useEffect, useLayoutEffect } from 'react';

// ----------------------------------------------------------------------

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useScrollToTop({ tag }: { tag?: string }) {
  useIsomorphicLayoutEffect(() => {
    if (tag) {
      const el = document.querySelector('.' + name);
      return el?.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
