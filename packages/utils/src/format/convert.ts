export const toPascaleCase = (str: string) => {
  return str.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
};

// ----------------------------------------------------------------------

export const toCamelCase = (str: string) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

// ----------------------------------------------------------------------

export function 파라미터문자열_특수기호변환(str: string) {
  return str.replaceAll(/&/g, '%26').replaceAll(/\+/g, '%2B').replaceAll(/&/g, '%3D');
}

// ----------------------------------------------------------------------

export function sliceText(text: string, maxLeng: number) {
  return text.length > maxLeng ? `${text.substring(0, maxLeng + 1)}...` : text;
}

// ----------------------------------------------------------------------

export const maskingPhoneNum = (phoneNumber: string) => {
  const values = phoneNumber.split('-');
  if (!values[1]) return phoneNumber;

  values[1] = '*'.repeat(values[1].length);

  return values.join('-');
};

// ----------------------------------------------------------------------

export function convertPhone(phone: string | undefined) {
  if (!phone) return '';
  return phone
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
}

// ----------------------------------------------------------------------

export function convertBirthDate(date: string | undefined) {
  if (!date) return '';
  return date
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, '$1.$2.$3')
    .replace(/(\.{1,2})$/g, '');
}

// ----------------------------------------------------------------------

export const convertFormData = (data: { [key: string]: any }) => {
  const formData = new FormData();

  data &&
    Object.keys(data).forEach((key) => {
      if (key === 'img') {
        data[key].forEach((i: any) => {
          formData.append('file', i);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

  return formData;
};

// ----------------------------------------------------------------------

export const switchValues = (arr: any[], idxs: [number, ...number[]]) => {
  let changeArr = idxs.map((idx) => arr[idx]);
  changeArr = [...changeArr.reverse()];

  return changeArr;
};

// ----------------------------------------------------------------------

export const getBrowserName = (): string => {
  if (typeof window === 'undefined') return 'server';
  const browser = window.navigator.userAgent;

  switch (true) {
    case /Trident|MSIE/.test(browser):
      return 'ie';
    case /Edge/.test(browser):
      return 'edge';
    case /Chrome/.test(browser):
      return 'chrome';
    case /Safari/.test(browser):
      return 'safari';
    case /Firefox/.test(browser):
      return 'firefox';
    case /Opera|OPR/.test(browser):
      return 'opera';
    default:
      return 'other';
  }
};

// ----------------------------------------------------------------------

export function getMobileName(userAgent: string): string {
  const mobileType = userAgent.toLowerCase();

  if (mobileType.indexOf('android') > -1) return 'android';
  else if (mobileType.indexOf('iphone') > -1 || mobileType.indexOf('ipad') > -1 || mobileType.indexOf('ipod') > -1)
    return 'ios';

  return 'other';
}

// ----------------------------------------------------------------------

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

// ----------------------------------------------------------------------

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

// ----------------------------------------------------------------------

export function getByteSize(char: string) {
  return new TextEncoder().encode(char).length;
}

// ----------------------------------------------------------------------

export function parseJWT(token: string | undefined) {
  if (!token) return null;

  try {
    return JSON.parse(Buffer.from(token.split('.')[1] ?? '', 'base64').toString());
  } catch (err) {
    console.log(err);
    return null;
  }
}
