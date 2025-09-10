'use client';

import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';

interface HydrateClientProps {
  children: React.ReactNode;
  state: DehydratedState;
}

export const HydrateQueryClient = HydrationBoundary;
