'use client';

import { useEffect } from 'react';
import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';

import { useFileUpload } from '../../hooks/use-file-upload';

// ----------------------------------------------------------------------

interface SingleImageUploadProps {
  onChange: (file: File) => void;
  value?: string;
}

const maxSizeMB = 5;
const maxSize = maxSizeMB * 1024 * 1024; // 5MB default

export function SingleImageUpload({ onChange, value }: SingleImageUploadProps) {
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      clearFiles,
    },
  ] = useFileUpload({
    accept: 'image/*',
    maxSize,
    multiple: false,
    initialFiles: value ? [{ url: value, name: value, id: value, size: 0, type: 'image/jpeg' }] : [],
  });

  const previewUrl = files[0]?.preview;

  const handleRemoveFile = () => {
    return removeFile(files[0]?.id as string);
  };

  useEffect(() => {
    if (files[0]?.file instanceof File) {
      onChange(files[0]?.file as File);
    }
  }, [files[0]?.preview]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input {...getInputProps()} className="sr-only" aria-label="Upload file" />
          {previewUrl ? (
            <div className="absolute inset-0">
              <img src={previewUrl} alt={files[0]?.file?.name || 'Uploaded image'} className="size-full object-cover" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageUpIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">여기에 이미지를 드래그하거나 클릭하여 업로드 해주세요</p>
              <p className="text-muted-foreground text-xs">제한 크기: {maxSizeMB}MB</p>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={handleRemoveFile}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
