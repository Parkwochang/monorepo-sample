'use client';

import Image from 'next/image';
import { useFileUpload } from '@workspace/ui/hooks';
import { CustomIcon } from '@workspace/ui/components/text';
import { useEffect } from 'react';
import { uploadImage } from '@/lib/helpers';

export const ProfileImageUploadForm = ({
  initialPreviewUrl,
  onChange,
}: {
  initialPreviewUrl?: string;
  onChange: (url: string) => void;
}) => {
  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
    multiple: false,
    initialFiles: initialPreviewUrl
      ? [{ url: initialPreviewUrl, name: initialPreviewUrl, id: initialPreviewUrl, size: 0, type: 'image/jpeg' }]
      : [],
    onFilesChange(files) {
      // 여러번 동작 이슈 발생
      console.log(files);
    },
  });

  const previewUrl = files[0]?.preview || null;

  useEffect(() => {
    if (files[0]?.file instanceof File) {
      uploadImage(files[0]?.file as File).then((res) => {
        res?.url && onChange(res?.url);
      });
      // onChange(files[0]?.file as File);
    }
  }, [files[0]?.preview]);

  return (
    <div className="flex-center">
      <div
        className="size-28 rounded-full overflow-hidden relative cursor-pointer bg-gray-100 border-2 border-gray-300"
        onClick={openFileDialog}
        aria-label={previewUrl ? 'Change image' : 'Upload image'}
      >
        {previewUrl ? (
          <Image src={previewUrl || '/images/profile_1.png'} alt="profile" fill className="object-cover" />
        ) : (
          <CustomIcon
            name="CircleUserRound"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 opacity-60"
          />
        )}
      </div>
      <input {...getInputProps()} className="sr-only" aria-label="Upload image file" tabIndex={-1} />
    </div>
  );
};
