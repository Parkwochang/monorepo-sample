import { AdminInstance } from '@workspace/http/lib';
import type { ResJson } from '@workspace/http/types/app';

import { CUSTOMER_URL } from './url';
import { CustomerDto, type CustomerEntity } from './dto';

// ----------------------------------------------------------------------
// ! 회원 목록

export async function getCustomers() {
  const { data } = await AdminInstance.get(CUSTOMER_URL.SITUATION.base).json<ResJson<CustomerEntity.Customer[]>>();

  return data;
}

export async function getCustomer(seq: number) {
  const { data } = await AdminInstance.get(CUSTOMER_URL.SITUATION.detail(seq)).json<ResJson<CustomerEntity.Customer>>();

  // const transformedData = CustomerDto.parseAsync(data);
  return CustomerDto.parseAsync(data);
}

export async function createCustomer(json: CustomerEntity.CreateCustomer) {
  const { message } = await AdminInstance.post(CUSTOMER_URL.SITUATION.base, {
    json,
  })
    .json<ResJson<null>>()
    .catch((error) => error);

  return message;
}

export async function updateCustomer(json: CustomerEntity.UpdateCustomer) {
  const { message } = await AdminInstance.patch(CUSTOMER_URL.SITUATION.base, {
    json,
  })
    .json<ResJson<null>>()
    .catch((error) => error);

  return message;
}

export async function deleteCustomer(json: CustomerEntity.DelCustomer) {
  const { message } = await AdminInstance.get(CUSTOMER_URL.SITUATION.base, {
    json,
  })
    .json<ResJson<null>>()
    .catch((error) => error);

  return message;
}
