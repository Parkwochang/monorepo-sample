'use client';

import { useState } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from '@workspace/ui/components/modal';
import { UserException } from '@workspace/http/lib/utils';

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

    const queryCache = new QueryCache({
      onError(error, query) {
        // HTTP 에러인 경우 커스텀 에러로 변환
        if (error && typeof error === 'object' && 'response' in error) {
          const httpError = error as any;
          const status = httpError.response?.status;

          if (status) {
            let customError: UserException;

            switch (status) {
              case 401:
                customError = new UserException('AuthError', { name: status.toString(), cause: 'Unauthorized' });
                break;
              case 403:
                customError = new UserException('ForbiddenError', { name: status.toString(), cause: 'Forbidden' });
                break;
              case 404:
                customError = new UserException('NotFound', { name: status.toString(), cause: 'Not Found' });
                break;
              case 500:
                customError = new UserException('ServerError', {
                  name: status.toString(),
                  cause: 'Internal Server Error',
                });
                break;
              case 502:
                customError = new UserException('NginxError', { name: status.toString(), cause: 'Bad Gateway' });
                break;
              case 503:
                customError = new UserException('NginxError', {
                  name: status.toString(),
                  cause: 'Service Unavailable',
                });
                break;
              default:
                customError = new UserException('UnknownError', { name: status.toString(), cause: 'Unknown Error' });
            }

            // Error Boundary로 전파
            throw customError;
          }
        }
      },
    });

    const queryClient = new QueryClient({
      mutationCache,
      queryCache,
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60,
          networkMode: 'offlineFirst',
          retry: false,
          retryOnMount: true,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          throwOnError: true,
        },

        mutations: {
          networkMode: 'offlineFirst',
          throwOnError: true,
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
