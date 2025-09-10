'use client';

import { useState } from 'react';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from '@workspace/ui/components/modal';

// ----------------------------------------------------------------------

type ToastTypes = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'default';

type ToastOptions = {
  [key in ToastTypes]: (message: React.ReactNode, data?: any) => any;
};

interface QueryProviderProps {
  children: React.ReactNode;
  // showNotification: ((message: React.ReactNode, data?: any) => string | number) & ToastOptions;
}

// ----------------------------------------------------------------------

export const QueryProvider = ({ children /* showNotification */ }: QueryProviderProps) => {
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

        // return toast.error(error.message);
      },
      onSettled: (data, error, variables, context, mutation) => {
        // loading 상태 필요
      },
    });

    const queryClient = new QueryClient({
      mutationCache,
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          networkMode: 'offlineFirst',
          retry: false,
          retryOnMount: true,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },

        mutations: {
          networkMode: 'offlineFirst',
          // onMutate: () => {
          //   setLoading(true);
          // },
          // onSettled: result => {
          //   setLoading(false);
          // },
          // onError: (error, variables, context) => {
          //   setLoading(false);
          // },
          // useErrorBoundary: true,
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
