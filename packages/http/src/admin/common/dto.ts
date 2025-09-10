import z from "zod";

import { REGEX } from "./regex";

// ----------------------------------------------------------------------

const StringSchema = z.string().min(1, '값을 입력해주세요.').max(30, '최대 30자까지 입력 가능합니다.');

const LgStringSchema = z.string().min(1, '값을 입력해주세요.').max(1000, '최대 1000자까지 입력 가능합니다.');

const NumberSchema = z.number({ message: '숫자를 입력해주세요.' });

const NumericSchema = z.string().regex(/^\d+$/, { message: '숫자만 입력해주세요.' }).transform(Number);

const EmailSchema = z.string().email('유효한 이메일 주소를 입력해주세요.');

const BirthSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '생년월일은 YYYY-MM-DD 형식이어야 합니다.');

const MobileSchema = z.string().regex(/^\d{2,4}-\d{3,4}-\d{4}$/, '유효한 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)');

const PhoneSchema = z.string().regex(/^\d{2,4}-\d{3,4}-\d{4}$/, '유효한 전화번호를 입력해주세요. (예: 02-1234-5678)');

const UserTypeSchema = z.enum(['01', '02']); /* 개인회원, 사업자 회원 */

const IdSchema = z.string().regex(/^[a-zA-Z0-9]{4,20}$/, '아이디는 4자 이상 20자 이하의 영문 대소문자와 숫자로만 구성되어야 합니다.');

const PasswordSchema = z.string().regex(REGEX.PASSWORD, '비밀번호는 10자 이상 20자 이하의 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.');

const SexSchema = z.enum(['M', 'F']); /* 남, 여 */

const ZipAddressSchema = z.string().length(5, '우편번호는 5자리 숫자로 입력해주세요. (예: 12345)');

const BusinessNumberSchema = z.string().regex(/^(\d-?){9}\d$|^(\d-?){13}\d$/, '유효한 사업자등록번호를 입력해주세요. (예: 123-45-67890)');

const EnumSchema = (type: [string, ...string[]]) => z.enum(type);

const AccountNumberSchema = z.string().regex(/^(?:\d+-?){10,13}\d$/, '계좌번호는 10자리에서 13자리 사이의 숫자와 하이픈(-)으로 구성되어야 합니다. (예: 123-456-7890)');

const AmountSchema = z.preprocess(a => parseInt(z.string().parse(a)), z.number());

const YNSchema = z.enum(['Y', 'N']);

const CheckSchema = z
  .enum(['Available', 'Duplicate', 'None'])
  .superRefine((value, ctx) => {
    if (value === 'None') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '중복 여부를 확인해주세요.',
      });

      return z.NEVER;
    }

    if (value === 'Duplicate') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '이미 사용 중입니다.',
      });

      return z.NEVER;
    }
  })

// const CheckSchema = z.union([z.string(), z.literal("available")], {message: '중복'});

// ----------------------------------------------------------------------

export const OptionalSchema = {
  StringSchema,
  LgStringSchema,
  NumberSchema,
  EmailSchema,
  BirthSchema,
  MobileSchema,
  PhoneSchema,
  UserTypeSchema,
  IdSchema,
  PasswordSchema,
  ZipAddressSchema,
  BusinessNumberSchema,
  EnumSchema,
  AccountNumberSchema,
  NumericSchema,
  AmountSchema,
  SexSchema,
  YNSchema,
  CheckSchema
};