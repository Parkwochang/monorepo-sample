import { FilterFn } from "@tanstack/react-table";

// 숫자 필터링 함수
export const numberFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  if (!value || value.trim() === "") return true;

  const cellValue = row.getValue(columnId);
  const filterValue = value.trim();

  // 셀 값을 숫자로 변환 시도
  let numericCellValue: number;

  // 다양한 형태의 숫자 처리
  if (typeof cellValue === "number") {
    numericCellValue = cellValue;
  } else if (typeof cellValue === "string") {
    // 문자열에서 숫자 추출 (쉼표, 공백 제거)
    const cleanedValue = cellValue.replace(/[,\s]/g, "");
    numericCellValue = Number(cleanedValue);
  } else {
    numericCellValue = Number(cellValue);
  }

  // 숫자가 아닌 경우 문자열로 처리
  if (
    isNaN(numericCellValue) ||
    numericCellValue === null ||
    numericCellValue === undefined
  ) {
    return String(cellValue || "")
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  }

  // 범위 필터 (예: "10-20")
  if (filterValue.includes("-") && !filterValue.startsWith("-")) {
    const [min, max] = filterValue
      .split("-")
      .map((v: string) => Number(v.trim()));
    if (!isNaN(min) && !isNaN(max)) {
      return numericCellValue >= min && numericCellValue <= max;
    }
  }

  // 비교 연산자 처리
  if (filterValue.startsWith(">=")) {
    const compareValue = Number(filterValue.slice(2).trim());
    return !isNaN(compareValue) && numericCellValue >= compareValue;
  }

  if (filterValue.startsWith("<=")) {
    const compareValue = Number(filterValue.slice(2).trim());
    return !isNaN(compareValue) && numericCellValue <= compareValue;
  }

  if (filterValue.startsWith(">")) {
    const compareValue = Number(filterValue.slice(1).trim());
    return !isNaN(compareValue) && numericCellValue > compareValue;
  }

  if (filterValue.startsWith("<")) {
    const compareValue = Number(filterValue.slice(1).trim());
    return !isNaN(compareValue) && numericCellValue < compareValue;
  }

  if (filterValue.startsWith("=")) {
    const compareValue = Number(filterValue.slice(1).trim());
    return !isNaN(compareValue) && numericCellValue === compareValue;
  }

  // 정확한 숫자 매칭 (기본값)
  const filterNumber = Number(filterValue);
  if (!isNaN(filterNumber)) {
    return numericCellValue === filterNumber;
  }

  // 숫자가 아닌 필터값인 경우 문자열로 처리
  return String(cellValue || "")
    .toLowerCase()
    .includes(filterValue.toLowerCase());
};

// 스마트 필터링 함수 (컬럼 타입에 따라 자동 선택)
export const smartFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  if (!value || value.trim() === "") return true;

  const cellValue = row.getValue(columnId);

  // 숫자 타입이거나 숫자로 변환 가능한 경우
  if (
    typeof cellValue === "number" ||
    (typeof cellValue === "string" &&
      !isNaN(Number(cellValue.replace(/[,\s]/g, ""))))
  ) {
    return numberFilter(row, columnId, value, addMeta);
  }

  // 기본 문자열 필터링
  return String(cellValue || "")
    .toLowerCase()
    .includes(value.toLowerCase());
};
