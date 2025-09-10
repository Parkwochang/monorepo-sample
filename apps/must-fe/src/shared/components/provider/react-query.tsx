'use client';

import { useState } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { toast } from '@workspace/ui/components/modal';

import { throwHttpError } from '@/lib/helpers/http';

// ----------------------------------------------------------------------

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [client] = useState(() => {
    const mutationCache = new MutationCache({
      onSuccess: (data, variables, context, mutation) => {
        if (mutation.options?.meta?.invalidateQueries) {
          const invalidateQueries = mutation.options.meta.invalidateQueries;

          queryClient.resetQueries({
            queryKey: typeof invalidateQueries === 'function' ? invalidateQueries(variables) : invalidateQueries,
          });
        }

        if (mutation.options?.meta?.successMessage) {
          return toast.success(mutation.options.meta.successMessage as string);
        }
      },
      onError: (error, variables, context, mutation) => {
        if (mutation.options?.meta?.errorMessage && error) {
          return toast.error(mutation.options.meta.errorMessage as string);
        }
      },
      onSettled: (data, error, variables, context, mutation) => {
        // loading 상태 필요
      },
    });

    const queryCache = new QueryCache({
      // onError는 throwOnError: true일 때 호출되지 않음
    });

    const queryClient = new QueryClient({
      mutationCache,
      // queryCache,
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          networkMode: 'offlineFirst',
          retry: false,
          retryOnMount: true,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          throwOnError: (error) => {
            const status = (error as any).response?.status;

            if (status) {
              throwHttpError({
                name: error.name,
                status: status,
                message: error.message ?? '',
                stack: error.stack ?? '',
              });
            }

            return status >= 400;
          },
        },
        mutations: {
          networkMode: 'offlineFirst',
        },
      },
    });

    return queryClient;
  });

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
