'use client';

import { useEffect, useState } from 'react';

export const useDelay = (delay: number) => {
  const [isDelay, setIsDelay] = useState(false);

  useEffect(() => {
    setIsDelay(true);

    const startTimeout = setTimeout(() => {
      setIsDelay(false);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  return { isDelay };
};
