'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import { Button } from '@workspace/ui/components/button';
import { CustomIcon } from '@workspace/ui/components/text';
import { fDateTime } from '@repo/core/lib';

import { ContentModal } from './content-modal';

function generateToken(id: number) {
  return JSON.stringify({
    date: fDateTime(new Date()),
    id,
  });
}

export const CreateQrModal = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(`https://must.woostack.dev/check-in?token=${encodeURIComponent(generateToken(id))}`);

  useEffect(() => {
    setUrl(`https://must.woostack.dev/check-in?token=${encodeURIComponent(generateToken(id))}`);
  }, [open]);

  return (
    <ContentModal
      open={open}
      setOpen={setOpen}
      title="QR 코드 생성"
      desc="출석체크시 스캔하여 출석체크를 할 수 있습니다."
      button={
        <Button variant={'ghost'}>
          <CustomIcon name={'QrCode'} className="size-5" />
        </Button>
      }
    >
      <div className="grid place-items-center mt-3">
        <QRCode value={url} />
      </div>
    </ContentModal>
  );
};
