import z from "zod";

import { OptionalSchema } from "../common/dto";

// ----------------------------------------------------------------------

// z.union([z.string().min(1), z.literal("")]).default("")

const CreateCustomerSchema = z.object({
  userType: OptionalSchema.UserTypeSchema,
  name: OptionalSchema.StringSchema,
  nickCheck: OptionalSchema.StringSchema,
  accountId: OptionalSchema.IdSchema,
  accountPasswd: OptionalSchema.PasswordSchema,
  mobileNumber: OptionalSchema.MobileSchema,
  agreementSms: OptionalSchema.YNSchema,
  email: OptionalSchema.EmailSchema,
  agreementEmail: OptionalSchema.YNSchema,
  birthdate: OptionalSchema.BirthSchema,
  sex: OptionalSchema.SexSchema,

  accountIdCheck: OptionalSchema.CheckSchema,

  address: OptionalSchema.StringSchema,
  zipcode: OptionalSchema.ZipAddressSchema,
  addressDetail: OptionalSchema.StringSchema,

  referrer: OptionalSchema.StringSchema.optional(),
  bankNameCode: OptionalSchema.NumberSchema,
  bankAccountName: OptionalSchema.StringSchema,
  bankAccountNumber: OptionalSchema.AccountNumberSchema,
  bankAccountApproval: OptionalSchema.YNSchema.optional().default('N'),
  connectionInformationStatus: OptionalSchema.YNSchema.optional().default('N'),
  adultApproval: OptionalSchema.YNSchema.optional().default('N'),
})
// .transform((data) => {
//   const [mobileNumber1, mobileNumber2, mobileNumber3] = data.mobileNumber.split('-');
//   const [email1, email2] = data.email.split('@');

//   return {
//     loginType: 'I',
//     mobileNumber1,
//     mobileNumber2,
//     mobileNumber3,
//     email1,
//     email2

//   }
// })

const CreateCustomerWithEnumDto = () => CreateCustomerSchema.extend({

})
// .refine((data) => {
//   if (data.userType === '01' && !data.birthdate) {
//     return false;
//   }
//   return true;
// }, {
//   message: '개인회원은 생년월일을 입력해야 합니다.',

function createDynamicSchema(includeAge: boolean) {
  const schema = CreateCustomerSchema.extend({
    // 조건부로 필드 추가
    ...(includeAge && { age: z.number() }),
  });
  return schema;
}

// ----------------------------------------------------------------------

const CreateGroupDto = z.object({
  groupName: OptionalSchema.StringSchema,
  parentGroupId: z.string().default('0102'),
  groupDepth: z.number().default(3),
  institutionCode: z.string().min(8).max(8),
  discountRate: z.number().default(5),
  description: z.string().optional(),
})

// ----------------------------------------------------------------------

const CreateMershipDto = z.object({
  description: OptionalSchema.StringSchema.optional(),
  membershipName: OptionalSchema.StringSchema,
  performanceConditionsEnd: OptionalSchema.NumberSchema,
  performanceConditionsStart: OptionalSchema.NumberSchema
})

// ----------------------------------------------------------------------

const CreateCustomerMemoDto = z.object({
  userMemoSeq: z.number({ message: 'userMemoSeq is required' }),
  accountSeq: z.number({ message: 'accountSeq is required' }),
  memo: z.string({ message: '메모를 입력해주세요.' }).min(1, { message: '' }),
  registDatetime: z.string({ message: '메모를 입력해주세요.' }).min(1, { message: '' }),
  registAdminAccountSeq: z.number({ message: 'registAdminAccountSeq is required' }),
  adminName: z.string({ message: 'adminName is required' })
})

// ----------------------------------------------------------------------

export namespace CustomerEntity {
  export type CreateCustomer = z.infer<typeof CreateCustomerSchema>;
  export type CreateGroup = z.infer<typeof CreateGroupDto>;
  export type CreateMership = z.infer<typeof CreateMershipDto>;
  export type CreateCustomerMemo = z.infer<typeof CreateCustomerMemoDto>;
}

export { CreateCustomerSchema, CreateGroupDto, CreateMershipDto, CreateCustomerMemoDto };


// export interface CustomerEntity {
//   createCustomer: z.infer<typeof CreateCustomerDto>;
//   creategroup: z.infer<typeof CreateGroupDto>;
//   createmembership: z.infer<typeof CreateMershipDto>;
//   createMemo: z.infer<typeof CreateCustomerMemoDto>;
// }