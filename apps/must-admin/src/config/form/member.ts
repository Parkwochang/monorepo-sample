import { MemberEntity } from '@workspace/http/must/member';

// ----------------------------------------------------------------------
// prettier-ignore

export const CREATE_MEMBER_FORM = {
  username       : '',
  password       : '',
  name           : '',
  englishName    : '',
  phone          : '',
  email          : '',
  address        : '',
  birthDate      : undefined,
  gender         : 'MALE',
  role           : 'MEMBER',
  profileImageUrl: '',
} as MemberEntity.CreateMember satisfies MemberEntity.CreateMember;

// ----------------------------------------------------------------------
// prettier-ignore

export const FIND_MEMBER_FORM = {
  page           : '0',
  size           : '10',
  name           : undefined,
  englishName    : undefined,
  phone          : undefined,
  email          : undefined,
  role           : undefined,
  isActive       : undefined,
  churchName     : undefined,
  searchStartDate: undefined,
  searchEndDate  : undefined,
} as MemberEntity.MemberParams satisfies MemberEntity.MemberParams;
