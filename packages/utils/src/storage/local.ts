export function getLocalStorage<T>(key: string): T | null;
export function getLocalStorage<T>(key: string, defaultValue: T): T;

export function getLocalStorage(key: string, defaultValue = null) {
  if (typeof window === "undefined") return defaultValue;
  try {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue;
    return JSON.parse(value);
  } catch (error) {
    console.error("localStorage 접근 실패:", error);
    return defaultValue;
  }
}

export const setLocalStorage = <T = any>(
  key: string,
  value: T,
  defaultValue?: T,
) => {
  if (typeof window === "undefined") {
    console.error("can not access without window");
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value || defaultValue));
  } catch (error) {
    console.error("localStorage 저장 실패:", error);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window === "undefined") {
    console.error("can not access without window");
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("localStorage 삭제 실패:", error);
  }
};
