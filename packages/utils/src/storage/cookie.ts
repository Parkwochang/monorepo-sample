export function getCookie<T>(name: string): T | null;
export function getCookie<T>(name: string, defaultValue: T): T;

export function getCookie(name: string, defaultValue = null) {
  name = `${name}=`;

  if (typeof document === "undefined") return defaultValue;

  const cookieData = document.cookie;

  let cookieValue = "";
  let start = cookieData.indexOf(name);

  if (start !== -1) {
    start += name.length;
    let end = cookieData.indexOf(";", start);
    if (end === -1) {
      end = cookieData.length;
    }
    cookieValue = cookieData.substring(start, end);
  }

  if (!cookieValue) return defaultValue;

  return JSON.parse(cookieValue);
  // 기존 소스
  // const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  // return value ? value : null;
}

export function setCookie<T>(name: string, value: T, options: any = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (typeof document === "undefined") {
    console.error("can not access without document");
    return;
  }

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updateCookie = encodeURIComponent(name) + "=" + JSON.stringify(value);

  for (const optionKey in options) {
    updateCookie += "; " + optionKey;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updateCookie += "=" + optionValue;
    }
  }

  document.cookie = updateCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    expires: new Date().toUTCString(),
  });
}

export const allDelCookies = (domain: string, path: string) => {
  if (typeof document === "undefined") {
    return null;
  }

  domain = domain || document.domain;
  path ||= "/";

  if (typeof document === "undefined") {
    console.error("can not access without document");
    return;
  }

  const cookies = document.cookie.split("; ");

  const expiration = "Sat, 01 Jan 1972 00:00:00 GMT";

  if (!document.cookie) {
    return console.log("no cookies.");
  }

  for (let i = 0; i < cookies.length; i++) {
    document.cookie = cookies[i]?.split("=")[0] + "=; expires=" + expiration;
  }
};
