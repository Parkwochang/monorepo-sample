'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { login, type AuthEntity } from '@workspace/http/must/auth';
import { MemberEntity, updateMember, updateMemberChurch } from '@workspace/http/must/member';
import { MEMBER_URL } from '@workspace/http/must/url';

import { parseUserJwt } from '@/lib/utils';
import { processLogin } from '@/shared/service';

// ----------------------------------------------------------------------

export const useLoginMutation = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: (data: AuthEntity.Login) => login(data),
    onSuccess: async (data) => {
      const userInfo = parseUserJwt(data.accessToken);

      if (process.env.NODE_ENV === 'development') {
        await processLogin(data.accessToken);
      }

      replace(userInfo?.churchId ? `/` : `/additional-info`);
    },
  });
};

export const uesUpdateChurchMutation = () => {
  return useMutation({
    mutationFn: (json: { id: number; churchId: number }) => updateMemberChurch(json),
    meta: {
      invalidateQueries: (json: { id: number; churchId: number }) => [MEMBER_URL.memberById(json.id)],
    },
  });
};

export const useUpdateMemberMutation = () => {
  return useMutation({
    mutationFn: (json: MemberEntity.UpdateMember) => updateMember(json),
    meta: {
      invalidateQueries: (json: MemberEntity.UpdateMember) => [MEMBER_URL.memberById(json.id)],
    },
  });
};
