'use server';

import { Client } from 'minio';
import { Readable } from 'stream';

import { getPublicUrl, uuidv4 } from '@/lib/utils';

// ----------------------------------------------------------------------

const minioClient = new Client({
  endPoint: 'minio-dev.woostack.dev',
  useSSL: true,
  accessKey: 'M9dtdCESsBXho9RvSfZw',
  secretKey: 'wL9BC071v3ikwKIJyc7dYTf3k5iL8JL92TTdSeO8',
});

export async function getMinioClient() {
  return minioClient;
}

export async function createImageBucket(bucket: string) {
  const exists = await minioClient.bucketExists(bucket);
  if (!exists) {
    await minioClient.makeBucket(bucket, 'us-east-1');
  }

  return bucket;
}

export async function uploadImage(file: File) {
  const bucket = await createImageBucket('must-profile');

  if (!bucket || !file) return null;

  const fileName = file.name.trim().replace(/\s+/g, '-');
  const uniqueFileName = `${Date.now()}-${uuidv4()}_${file.name}`;
  const fileBuffer = await file.arrayBuffer(); // File 객체는 Blob 객체를 확장한 객체로 주로 파일시스템과 관련된 기능을 담당한다.
  const stream = Readable.from(Buffer.from(fileBuffer)); // (blob ->  arrayBuffer)를 buffer로 바로 변환이 안되기 때문에 이와 같은 과정을 이행

  const metadata = {
    'Content-Type': file.type,
    'Cache-Control': 'max-age=31536000',
    'Content-Disposition': `inline;` /* filename=${file.name} */,
    'x-amz-acl': 'public-read',
  };

  return await minioClient
    .putObject(bucket, uniqueFileName, stream, file.size, metadata)
    .then(async (res) => {
      return {
        ...res,
        originalName: file.name,
        fileName: uniqueFileName,
        url: getPublicUrl(bucket, uniqueFileName),
        presignedUrl: getPublicUrl(bucket, uniqueFileName) /* await getPresignedUrl(bucket, uniqueFileName), */,
      };
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export async function getPresignedUrl(bucket: string, fileName: string) {
  try {
    // 100년 = 60 * 60 * 24 * 365 * 100
    return await minioClient.presignedGetObject(bucket, fileName, 60 * 60 * 24 * 7);
  } catch (error) {
    console.error('Error generating long-lived presigned URL:', error);
    return null;
  }
}

export async function getFileInfo(bucket: string, fileName: string) {
  return await minioClient.getObject(bucket, fileName);
}
