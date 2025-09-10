export function NumberToCommas(number: number | string | undefined) {
  const num = Number(number);

  if (isNaN(num)) {
    return "0";
  }
  return num.toLocaleString();

  // if (!number || !/^[0-9,]/.test(String(number))) {
  //   return '0';
  // }

  // return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ----------------------------------------------------------------------

export const CommasToNumber = (number = "") => {
  const num = Number(number.replace(/,/g, ""));

  if (isNaN(num)) {
    return 0;
  }

  return num;
};

// ----------------------------------------------------------------------

export function slicePriceMan(price: number) {
  const result = price.toString().split("");

  if (result.length > 5) {
    result.reverse().splice(0, 4);
    result.reverse();
    return result.join("") + "만";
  }

  return result.join("");
}

// ----------------------------------------------------------------------

export function EnterNumberOnly(value: string | number) {
  return value.toString().replace(/[^0-9]/g, "");
}

// ----------------------------------------------------------------------
// ! 과세 비과세는 소수 첫번째자리까지 허용해야 해서 만듬

export function EnterTaxRateOnly(value: string | number): string {
  let strValue = value.toString();

  strValue = strValue.replace(/[^0-9.]/g, "");

  const parts = strValue.split(".");
  if (parts.length > 1) {
    strValue = parts[0] + "." + parts[1]!.charAt(0);
  }

  const numericValue = parseFloat(strValue);
  if (numericValue > 100) {
    return "100";
  }

  return strValue;
}

// ----------------------------------------------------------------------
