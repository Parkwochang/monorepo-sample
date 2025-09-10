// ----------------------------------------------------------------------
// ! 권한 처리

import { type AuthEntity } from '@workspace/http/must/auth';

export function checkUserRole(userInfo?: AuthEntity.UserInfo) {
  if (!userInfo || !userInfo.role) return null;

  if (userInfo.role !== 'ADMIN' && userInfo.role !== 'LEADER') return null;

  return userInfo.role;
}

export function getPublicUrl(bucket: string, fileName: string) {
  return `https://minio-dev.woostack.dev/${bucket}/${fileName}`;
}
