export async function delay(ms: number, promiseFn?: () => Promise<any>) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (promiseFn) {
        promiseFn().then(resolve);
      }
      resolve;
    }, ms);
  });
}

// ----------------------------------------------------------------------

export const isEmpty = (
  param: { [keys: string]: any } | any[] | string | null | undefined,
): boolean => {
  if (!param) return true;

  return !Object.keys(param).length;
};

// ----------------------------------------------------------------------

export const isClient = () => {
  if (typeof window !== "undefined") {
    return true;
  }
  return false;
};

// ----------------------------------------------------------------------

export const measureTime = (action: () => void) => {
  const startTime = performance.now();
  action();
  const endTime = performance.now();
  return `${parseFloat((endTime - startTime).toFixed(3))}ms`;
};

// ----------------------------------------------------------------------

export const measureTimeConsole = (action: () => void, text?: string) => {
  const logText = text ?? "measureTimeConsole";
  console.time(logText);
  action();
  console.timeEnd(logText);
};

// ----------------------------------------------------------------------

export const isErrorWithMessage = (
  error: unknown,
): error is { message: string } => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

// ----------------------------------------------------------------------
// TODO : [PACKAGE] 파일 타입 비교
// export const validateFileType = (type:string): string => {

//   switch (type) {
//     case /(.*?)\.(jpg|jpeg|png|gif|bmp|pdf)$/.test(type):
//       return 'ie';
//     case /Edge/.test(browser):
//       return 'edge';
//     case /Chrome/.test(browser):
//       return 'chrome';
//     case /Safari/.test(browser):
//       return 'safari';
//     case /Firefox/.test(browser):
//       return 'firefox';
//     case /Opera|OPR/.test(browser):
//       return 'opera';
//     default:
//       return 'other';
//   }
// };
