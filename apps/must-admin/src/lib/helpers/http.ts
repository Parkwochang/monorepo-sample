import { UserException } from '@repo/utils';
import { notFound, redirect } from 'next/navigation';

interface CustomHttpErrorProps {
  name: string;
  status: number;
  message: string;
  stack: string;
}

export function throwHttpError({ name, status = 400, message, stack }: CustomHttpErrorProps) {
  switch (status) {
    case 401:
      redirect('/sign-in');
    case 404:
      notFound();
    default:
      throw new UserException(name, { name: status.toString(), cause: message + stack });
  }
}
