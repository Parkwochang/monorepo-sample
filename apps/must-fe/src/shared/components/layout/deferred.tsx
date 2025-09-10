'use client';

import { useEffect, useState } from 'react';

interface DeferredProps {
  loading?: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
}

export const DeferredLayout = ({ children, loading, fallback, delay = 200 }: DeferredProps) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      loading && setIsDeferred(true);
    }, delay);

    if (!loading) {
      setIsDeferred(false);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  if (isDeferred) return <>{fallback}</>;

  if (loading) return null;

  return <>{children}</>;
};
