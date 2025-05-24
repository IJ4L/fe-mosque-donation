import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      networkMode: 'offlineFirst',
      refetchOnMount: false,
    },
  },
});