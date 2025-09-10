import ky from 'ky';

import { KyOptions } from './http';

// ----------------------------------------------------------------------

export const httpInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // Cross-Origin 쿠키 전송을 위해 추가
  timeout: 18000,
  hooks: {
    beforeRequest: [KyOptions.setClientHeader],
    afterResponse: [KyOptions.afterClientResponseLog],
    beforeError: [KyOptions.beforeClientErrorLog],
  },
});

export const httpServerInstance = ky.create({
  prefixUrl: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  hooks: {
    beforeRequest: [KyOptions.setAuthorizationHeader],
    afterResponse: [KyOptions.afterResponseLog],
    beforeError: [KyOptions.beforeErrorLog],
  },
});

export const AdminInstance = httpInstance;
export const UserInstance = httpInstance;

export const MustInstance = httpInstance;
