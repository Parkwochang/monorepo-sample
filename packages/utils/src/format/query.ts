export function parseQueryToObj<T extends Record<string, string>>(
  obj: T,
  arraryKey = "|",
) {
  const newQuery = structuredClone(obj) as Record<string, any>;

  Object.keys(newQuery).forEach((key) => {
    if (newQuery[key]?.includes(arraryKey)) {
      newQuery[key] = newQuery[key].split(arraryKey);
    }
  });

  return newQuery;
}

// ----------------------------------------------------------------------

export function deleteEmptyObj<T extends Record<string, any>>(
  obj: T,
  strType = "ALL",
) {
  const cloneObj = structuredClone(obj);

  Object.keys(cloneObj).forEach((key) => {
    if (!cloneObj[key]) {
      return delete cloneObj[key];
    }

    if (Array.isArray(cloneObj[key])) {
      const isEmpty = cloneObj[key].every(
        (item: string | number | boolean) =>
          !item || item.toString().toUpperCase() === "ALL",
      );

      return isEmpty && delete cloneObj[key];
    }

    if (typeof cloneObj[key] === "object") {
      return deleteEmptyObj(cloneObj[key]);
    }

    if (cloneObj[key].toString().toUpperCase() === strType) {
      return delete cloneObj[key];
    }
  });

  return cloneObj;
}

// ----------------------------------------------------------------------

export function delEmptyArrParams<T extends Record<string, string>>(
  searchParmas?: T,
  arrType = "|",
) {
  if (!searchParmas) return searchParmas;

  const copyData = structuredClone(searchParmas);

  const condition =
    copyData &&
    Object.keys(copyData).some((item) => copyData[item]?.includes(arrType));

  if (!condition) return copyData;

  for (const key in copyData) {
    if (copyData[key]?.includes(arrType)) {
      copyData[key] = copyData[key]
        ?.split(arrType)
        .filter((item) => item)
        .join(arrType) as T[Extract<keyof T, string>];
    }
  }

  return copyData;
}

// ----------------------------------------------------------------------

export function mergeQuery<T extends Record<string, any>>(
  defaultValue: T,
  query: Partial<T>,
) {
  return {
    ...structuredClone(defaultValue),
    ...structuredClone(query),
  };
}

// ----------------------------------------------------------------------

export function StrToArrWithForm<T extends string[]>(
  str: string,
  arr: T,
  arrType = "|",
) {
  if (!str) return arr.map(() => "");

  const parseStr = str.split(arrType);
  const new_form_arr = arr.map((item) => (parseStr.includes(item) ? item : ""));

  return new_form_arr;
}
