import { throwHttpError } from '@/lib/helpers/http';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from '@workspace/ui/components/modal';

// const mutationCache = new MutationCache({
//   onSuccess: (data, variables, context, mutation) => {
//     if (mutation.options?.meta?.invalidateQueries) {
//       const invalidateQueries = mutation.options.meta.invalidateQueries;

//       queryClient.resetQueries({
//         queryKey: typeof invalidateQueries === 'function' ? invalidateQueries(variables) : invalidateQueries,
//       });
//     }

//     if (mutation.options?.meta?.successMessage) {
//       return toast.success(mutation.options.meta.successMessage as string);
//     }
//   },
//   onError: (error, variables, context, mutation) => {
//     if (mutation.options?.meta?.errorMessage && error) {
//       return toast.error(mutation.options.meta.errorMessage as string);
//     }

//     // return toast.error(error.message);
//   },
//   onSettled: (data, error, variables, context, mutation) => {
//     // loading 상태 필요
//   },
// });

// const queryCache = new QueryCache({
//   onError: (error: any) => {
//     const status = error.response?.status;
//     console.log('status', status);
//   },
//   // onError는 throwOnError: true일 때 호출되지 않음
// });
