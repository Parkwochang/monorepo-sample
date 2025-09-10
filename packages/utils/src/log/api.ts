import { isEmpty } from "../helper";
import { UserException } from "./error";

// ----------------------------------------------------------------------

type ApiRequest<T = unknown> = {
  json: <J = T>() => Promise<J>;
} & Request;

type ApiResponse<T = unknown> = {
  json: <J = T>() => Promise<J>;
} & Response;

interface HTTPError<T = unknown> extends Error {
  response: ApiResponse<T>;
  request: ApiRequest;
}

// ----------------------------------------------------------------------
// ! api 로그

export async function updateApiLog(error: HTTPError) {
  // console.group('updateApiLog');
  // console.log('request url : ', error.request.url)
  // console.log('response url : ', error?.response?.url)
  // console.groupEnd();

  if (process.env.NODE_ENV !== "production") return null;

  if (error.response.status <= 400) return null;

  const json = {
    method: error.request.method,
    statusCode: error.response.status,

    ...(error.request?.headers && {
      requestHeaders: JSON.stringify(
        Object.fromEntries([...(error.request.headers as Headers)]),
      ),
    }),
    ...(error.response?.headers && {
      responseHeaders: JSON.stringify(
        Object.fromEntries([...error.response.headers]),
      ),
    }),
    ...(!isEmpty(error.request?.body) && {
      requestBody: await error.response?.text(),
    }),
    ...(!isEmpty(error.response?.body) && {
      responseBody: await error.response?.text(),
    }),

    origin: error.request.url,
    destination: error?.response?.url ?? "",
    environment: process.env.ENVIRONMENT ?? process.env.NEXT_PUBLIC_ENVIRONMENT,
  };

  console.log("error json body : ", json);

  return fetch("https://admin.woostack.site/api/logging", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => console.log("error log :::"));
}

// ----------------------------------------------------------------------

export async function updateUserApiLog(error: HTTPError) {
  if (process.env.NODE_ENV !== "production") return null;

  if (error.response.status <= 400) return null;

  const json = {
    method: error.request.method,
    statusCode: error.response.status,

    ...(error.request?.headers && {
      requestHeaders: JSON.stringify(
        Object.fromEntries([...(error.request.headers as Headers)]),
      ),
    }),
    ...(error.response?.headers && {
      responseHeaders: JSON.stringify(
        Object.fromEntries([...error.response.headers]),
      ),
    }),
    ...(!isEmpty(error.request?.body) && {
      requestBody: await error.response?.text(),
    }),
    ...(!isEmpty(error.response?.body) && {
      responseBody: await error.response?.text(),
    }),

    origin: error.request.url,
    destination: error?.response?.url ?? "",
    environment: process.env.ENVIRONMENT ?? process.env.NEXT_PUBLIC_ENVIRONMENT,
  };

  console.log("error json body : ", json);

  return fetch("https://admin.woostack.site/api/user-logging", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => console.log("error log :::"));
}

// ----------------------------------------------------------------------
// ! 화면 로그

export async function updatePageLog(
  request: UserException & { origin: string },
) {
  if (process.env.NODE_ENV !== "production") return null;

  const json = {
    origin: request.origin,
    name: `[${request.name}] ${request.message}`,
    reason: request.stack,
    cause: request.cause,
    environment: process.env.ENVIRONMENT ?? process.env.NEXT_PUBLIC_ENVIRONMENT,
  };

  return fetch("https://admin.woostack.site/api/screen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => console.log("error log :::"));
}

// ----------------------------------------------------------------------
// ! 화면 로그

export async function updateUserPageLog(
  request: UserException & { origin: string },
) {
  if (process.env.NODE_ENV !== "production") return null;

  const json = {
    origin: request.origin,
    name: `[${request.name}] ${request.message}`,
    reason: request.stack,
    cause: request.cause,
    environment: process.env.ENVIRONMENT ?? process.env.NEXT_PUBLIC_ENVIRONMENT,
  };

  return fetch("https://admin.woostack.site/api/user-screen", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  }).catch(() => console.log("error log :::"));
}
