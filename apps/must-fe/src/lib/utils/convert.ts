import { parseJWT } from '@repo/utils';
import { type AuthEntity } from '@workspace/http/must/auth';

/**
 * @param condition 원본 데이터
 * @param key 변환 매칭 키 -> 해당하는 프로퍼티 키 대입
 * @returns
 * @example
 * const condition = [
 *   { name: 'label1', id: 'value1' },
 *   { name: 'label2', id: 'value2' },
 * ];
 * const key = { label: 'name', value: 'id' };
 * const result = objToSelectObj(condition, key);
 * // [ { label: 'label1', value: 'value1' }, { label: 'label2', value: 'value2' } ]
 */
export function objToSelectObj<T extends Record<string, any>[]>(
  condition: T,
  key: { label: keyof T[number]; value: keyof T[number] },
) {
  const select_obj = structuredClone(condition);
  const { label, value } = key;

  return select_obj.map((item) => ({
    label: item[label as keyof typeof item],
    value: item[value as keyof typeof item].toString(),
  }));
}

// ----------------------------------------------------------------------

export function checkUserRole(userInfo?: AuthEntity.UserInfo) {
  if (!userInfo || !userInfo.role) return null;

  return userInfo.role;
}

export function getPublicUrl(bucket: string, fileName: string) {
  return `https://minio-dev.woostack.dev/${bucket}/${fileName}`;
}

export function parseUserJwt(accessToken: string) {
  return parseJWT(accessToken) as AuthEntity.UserInfo;
}
