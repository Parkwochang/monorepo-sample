'use client';

import { useEffect } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { SingleImageUpload } from '@workspace/ui/components/form';

import { useUploadImage } from '@/shared/hooks';

// ----------------------------------------------------------------------

interface ImageUploadProps {
  fieldName: string;
  form: UseFormReturn<any>;
}

export const ImageUpload = ({ fieldName, form }: ImageUploadProps) => {
  const { uploadImageResult, handleUploadImage, isError, isUploading, handleGetFileInfo } = useUploadImage();

  const defaultImage = form.getValues(fieldName) || null;

  const handleImageChange = async (file: File) => {
    await handleUploadImage(file).then((res) => {
      if (res) {
        form.setValue(fieldName, res.url);
      }
    });
  };

  return <SingleImageUpload onChange={handleImageChange} value={defaultImage} />;
};
