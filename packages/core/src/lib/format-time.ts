import { format, getTime, formatDistanceToNow, differenceInHours } from 'date-fns';
import { ko } from 'date-fns/locale';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy-MM-dd';

  return date ? format(new Date(date), fm, { locale: ko }) : '';
}

// ----------------------------------------------------------------------

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'yyyy-MM-dd HH:mm:ss';

  return date ? format(new Date(date), fm, { locale: ko }) : '';
}

// ----------------------------------------------------------------------

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

// ----------------------------------------------------------------------

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: ko,
        includeSeconds: true,
      })
    : '';
}

export function fDiffTime(prevDate: InputValue, nextDate: InputValue) {
  return prevDate && nextDate ? differenceInHours(new Date(nextDate), new Date(prevDate)) + 1 : 0;
}
