'use client';

import { useMutation } from '@tanstack/react-query';

import { completeMission } from '@workspace/http/must/mission';

// ----------------------------------------------------------------------

export const useCompleteMissionMutation = () => {
  return useMutation({
    mutationFn: completeMission,
  });
};
