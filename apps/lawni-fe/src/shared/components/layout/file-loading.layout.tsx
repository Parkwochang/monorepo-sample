'use client';

import { memo } from 'react';
import Lottie from 'react-lottie-player';

import { useLoadingStore } from '@/shared/store/open.store';
import loadingJson from 'public/animation/loading-files.json';

// ----------------------------------------------------------------------

const LoadingComponent = () => {
  const isLoading = useLoadingStore.use.isLoading();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Lottie animationData={loadingJson} loop play />
      </div>
    );
  }

  return null;
};

export const FileLoadingLayout = memo(LoadingComponent);
