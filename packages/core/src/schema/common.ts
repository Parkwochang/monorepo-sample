import z from "zod";

import { REGEX } from "./regex";

// ----------------------------------------------------------------------

const StringSchema = z.string().min(1);

const NumberSchema = z.number();

const NumericSchema = z.string().regex(/^\d+$/).transform(Number);

const EmailSchema = z.string().email();

const BirthSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const MobileSchema = z.string().regex(/^\d{2,4}-\d{3,4}-\d{4}$/);

const PhoneSchema = z.string().regex(/^\d{2,4}-\d{3,4}-\d{4}$/);

const UserTypeSchema = z.enum(['01', '02']); /* 개인회원, 사업자 회원 */

const IdSchema = z.string().regex(/^[a-zA-Z0-9]{4,20}$/);

const PasswordSchema = z.string().regex(REGEX.PASSWORD);

const SexSchema = z.enum(['M', 'F']); /* 남, 여 */

const ZipAddressSchema = z.string().length(5);

const BusinessNumberSchema = z.string().regex(/^(\d-?){9}\d$|^(\d-?){13}\d$/);

const EnumSchema = (type: [string, ...string[]]) => z.enum(type);

const AccountNumberSchema = z.string().regex(/^(?:\d+-?){10,13}\d$/);

const AmountSchema = z.preprocess(a => parseInt(z.string().parse(a)), z.number());

const YNSchema = z.enum(['Y', 'N']);

// ----------------------------------------------------------------------

export const OptionalSchema = {
  StringSchema,
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
  YNSchema
};