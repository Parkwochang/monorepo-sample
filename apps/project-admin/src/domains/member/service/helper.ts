import type { MemberEntity } from '@workspace/http/must/member';
import { CREATE_MEMBER_FORM } from '@/config/form';

// ----------------------------------------------------------------------

export const transformMember = (member: MemberEntity.MemberRes) => {
  const { id, address, username, name, englishName, phone, email, birthDate, gender, role, profileImageUrl, churchId } =
    member;

  return {
    id,
    address,
    username,
    name,
    englishName,
    phone,
    email,
    birthDate,
    gender,
    role,
    profileImageUrl,
    churchId,
  } as MemberEntity.UpdateMember satisfies MemberEntity.UpdateMember;
};
