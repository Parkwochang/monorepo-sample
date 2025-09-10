import z from 'zod';

import { OptionalSchema } from '../common/dto';

// ----------------------------------------------------------------------
// prettier-ignore
const CustomerDto = z.object({
  accountSeq                  : z.number(),
  accountId                   : z.string(),
  name                        : z.string(),
  userTypeName                : z.string(),
  eventGroupName              : z.string(),
  eventGroupApproval          : z.nullable(z.enum(['APPROVAL', 'REQUEST', 'REJECT'])),
  eventGroupApprovalName      : z.string(),
  partnershipGroupName        : z.string(),
  requestEventGroupCode       : z.nullable(z.string()),
  partnershipGroupApproval    : z.nullable(z.enum(['APPROVAL', 'REQUEST', 'REJECT'])),
  partnershipGroupApprovalName: z.string(),
  requestPartnershipGroupCode : z.nullable(z.string()),
  mobileNumber1               : z.string(),
  mobileNumber2               : z.string(),
  mobileNumber3               : z.string(),
  membershipName              : z.string(),
  emoney                      : z.number(),
  orderCount                  : z.number(),
  loginTypeName               : z.string(),
  lastVisitDatetime           : z.string(),
  registDatetime              : z.string(),
  agreementSms                : z.string(),
  agreementEmail              : z.string(),
  email1                      : z.string(),
  email2                      : z.string(),
})
  .transform(({ mobileNumber1, mobileNumber2, mobileNumber3, email1, email2, ...rest }) => ({
    ...rest,
    mobileNumber: `${mobileNumber1}-${mobileNumber2}-${mobileNumber3}`,
    email: `${email1}@${email2}`
  }))

// ----------------------------------------------------------------------
// prettier-ignore
const CreateCustomerDto = z.object({
  userType                   : OptionalSchema.UserTypeSchema,
  name                       : OptionalSchema.StringSchema,
  nickCheck                  : OptionalSchema.StringSchema,
  accountId                  : OptionalSchema.IdSchema,
  accountPasswd              : OptionalSchema.PasswordSchema,
  mobileNumber               : OptionalSchema.MobileSchema,
  agreementSms               : OptionalSchema.YNSchema,
  email                      : OptionalSchema.EmailSchema,
  agreementEmail             : OptionalSchema.YNSchema,
  birthdate                  : OptionalSchema.BirthSchema,
  sex                        : OptionalSchema.SexSchema,
  accountIdCheck             : OptionalSchema.CheckSchema,
  address                    : OptionalSchema.StringSchema,
  zipcode                    : OptionalSchema.ZipAddressSchema,
  addressDetail              : OptionalSchema.StringSchema,
  referrer                   : OptionalSchema.StringSchema.optional(), // 추천인 코드
  bankNameCode               : OptionalSchema.NumberSchema,
  bankAccountName            : OptionalSchema.StringSchema,
  bankAccountNumber          : OptionalSchema.AccountNumberSchema,
  bankAccountApproval        : OptionalSchema.YNSchema.optional().default('N'),
  connectionInformationStatus: OptionalSchema.YNSchema.optional().default('N'),
  adultApproval              : OptionalSchema.YNSchema.optional().default('N'),
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

// ----------------------------------------------------------------------

const UpdateCustomerDto = CreateCustomerDto.extend({
  accountSeq: z.number(),
});

// ----------------------------------------------------------------------
// prettier-ignore
const DelCustomerDto = z.object({
  accountSeq      : z.number(),
  withdrawalReason: OptionalSchema.StringSchema.min(1, '탈퇴 사유를 입력해주세요.'),
})

// ----------------------------------------------------------------------

const CreateCustomerWithEnumDto = () => CreateCustomerDto.extend({});
// .refine((data) => {
//   if (data.userType === '01' && !data.birthdate) {
//     return false;
//   }
//   return true;
// }, {
//   message: '개인회원은 생년월일을 입력해야 합니다.',

function createDynamicSchema<T extends Record<string, any>>(dto: z.ZodObject<T>, includeAge: boolean) {
  const schema = CreateCustomerDto.extend({
    // 조건부로 필드 추가
    ...(includeAge && { age: z.number() }),
  });
  return schema;
}

// ----------------------------------------------------------------------
// prettier-ignore
const CreateGroupDto = z.object({
  groupName      : OptionalSchema.StringSchema,
  parentGroupId  : z.string().default('0102'),
  groupDepth     : z.number().default(3),
  institutionCode: z.string().min(8).max(8),
  discountRate   : z.number().default(5),
  description    : z.string().optional(),
})

// ----------------------------------------------------------------------
// prettier-ignore
const CreateMershipDto = z.object({
  description               : OptionalSchema.StringSchema.optional(),
  membershipName            : OptionalSchema.StringSchema,
  performanceConditionsEnd  : OptionalSchema.NumberSchema,
  performanceConditionsStart: OptionalSchema.NumberSchema
})

// ----------------------------------------------------------------------
// prettier-ignore
const CreateCustomerMemoDto = z.object({
  userMemoSeq          : z.number({ message: 'userMemoSeq is required' }),
  accountSeq           : z.number({ message: 'accountSeq is required' }),
  memo                 : z.string({ message: '메모를 입력해주세요.' }).min(1, { message: '' }),
  registDatetime       : z.string({ message: '메모를 입력해주세요.' }).min(1, { message: '' }),
  registAdminAccountSeq: z.number({ message: 'registAdminAccountSeq is required' }),
  adminName            : z.string({ message: 'adminName is required' })
})

// ----------------------------------------------------------------------
// prettier-ignore
export namespace CustomerEntity {
  export type Customer           = z.infer<typeof CustomerDto>;
  export type CreateCustomer     = z.infer<typeof CreateCustomerDto>;
  export type UpdateCustomer     = z.infer<typeof UpdateCustomerDto>;
  export type DelCustomer        = z.infer<typeof DelCustomerDto>;
  export type CreateGroup        = z.infer<typeof CreateGroupDto>;
  export type CreateMership      = z.infer<typeof CreateMershipDto>;
  export type CreateCustomerMemo = z.infer<typeof CreateCustomerMemoDto>;
}

export {
  CustomerDto,
  CreateCustomerDto,
  UpdateCustomerDto,
  DelCustomerDto,
  CreateGroupDto,
  CreateMershipDto,
  CreateCustomerMemoDto,
};
