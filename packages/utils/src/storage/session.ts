export function getSessionStorage<T>(key: string): T | null;
export function getSessionStorage<T>(key: string, defaultValue: T): T;

export function getSessionStorage(key: string, defaultValue = null) {
  if (typeof window === "undefined") return defaultValue;
  const value = sessionStorage.getItem(key);
  if (!value) return defaultValue;
  return JSON.parse(value);
}

export const setSessionStorage = <T = any>(
  key: string,
  value: T,
  defaultValue?: T,
) => {
  if (typeof window === "undefined") {
    console.error("can not access without window");
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(value || defaultValue));
};

export const removeSessionStorage = (key: string) => {
  if (typeof window === "undefined") {
    console.error("can not access without window");
    return;
  }
  sessionStorage.removeItem(key);
};
