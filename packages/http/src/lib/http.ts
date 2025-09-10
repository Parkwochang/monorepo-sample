import type { HTTPError as HTTPErrorType, BeforeRequestHook, AfterResponseHook, BeforeErrorHook } from 'ky';

import type { ResJson } from '@workspace/http/types/app';

import { clientLogger, serverLogger } from './console';
import { getServerCookie } from './server';
import { UserException } from './utils';

// ----------------------------------------------------------------------
// ! 400 ERROR handler

export const parseErrorData = async (error: HTTPErrorType) => {
  const { message, httpStatus } = await error.response.json<ResJson<null>>();

  return { httpStatus, message };
};

export type { HTTPErrorType };

// ----------------------------------------------------------------------
// ! ERROR handler

export class HttpError {
  private static throwErrorByStatus(status: number) {
    let customError: UserException;

    switch (status) {
      case 401:
        customError = new UserException('AuthError', { name: status.toString(), cause: 'Unauthorized' });
        break;
      case 403:
        customError = new UserException('ForbiddenError', { name: status.toString(), cause: 'Forbidden' });
        break;
      case 404:
        customError = new UserException('NotFound', { name: status.toString(), cause: 'Not Found' });
        break;
      case 500:
        customError = new UserException('ServerError', { name: status.toString(), cause: 'Internal Server Error' });
        break;
      case 502:
        customError = new UserException('NginxError', { name: status.toString(), cause: 'Bad Gateway' });
        break;
      case 503:
        customError = new UserException('NginxError', { name: status.toString(), cause: 'Service Unavailable' });
        break;
      default:
        customError = new UserException('UnknownError', { name: status.toString(), cause: 'Unknown Error' });
    }

    return customError;
  }

  static backend(error: HTTPErrorType) {
    const { status } = error.response;

    return this.throwErrorByStatus(status);
  }
}

// ----------------------------------------------------------------------
// ! Ky Options

export class KyOptions {
  static setAuthorizationHeader: BeforeRequestHook = async (request) => {
    const token = await getServerCookie('WSAT');

    token && request.headers.set('Authorization', `Bearer ${token}`);

    return request;
  };

  static setClientHeader: BeforeRequestHook = async (request) => {
    if (process.env.NODE_ENV === 'development') {
      const token = await getServerCookie('WSAT');
      token && request.headers.set('Authorization', `Bearer ${token}`);
    }

    return request;
  };

  // ----------------------------------------------------------------------
  // ! ERROR handler

  static beforeErrorLog: BeforeErrorHook = async (error) => {
    serverLogger({ result: 'ERROR', request: error.request, status: error.response.status });

    return error;
  };

  static beforeClientErrorLog: BeforeErrorHook = async (error) => {
    clientLogger({
      status: error.response.status,
      reqData: error.request,
      resData: error.response,
      method: 'error',
    });

    return error;
  };

  // ----------------------------------------------------------------------
  // ! RESPONSE handler

  static afterResponseLog: AfterResponseHook = (request, options, response) => {
    // response.clone
    if (response.ok) {
      serverLogger({ result: 'SUCCESS', request, status: response.status });

      return response;
    }
  };

  static afterClientResponseLog: AfterResponseHook = (request, options, response) => {
    if (response.ok) {
      clientLogger({
        status: response.status,
        reqData: request,
        resData: response,
        method: 'log',
      });
    }

    return response;
  };
}
