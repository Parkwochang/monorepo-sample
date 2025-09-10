'use client';

import { getFileInfo, uploadImage } from '@/server';
import { useMutation } from '@tanstack/react-query';

export const useUploadImage = () => {
  const {
    mutateAsync: uploadImageMutation,
    isPending: isUploading,
    data: uploadImageResult,
    isError,
  } = useMutation({
    mutationFn: uploadImage,
  });

  const handleUploadImage = async (file: File) => {
    const result = await uploadImageMutation(file);
    console.log(result);
    return result;
  };

  const handleGetFileInfo = async (fileName: string) => {
    const result = await getFileInfo('must-profile', fileName);
    return result;
  };

  return {
    uploadImageResult,
    handleUploadImage,
    handleGetFileInfo,
    isUploading,
    isError,
  };
};
