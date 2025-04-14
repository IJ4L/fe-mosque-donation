import { QueryClient } from '@tanstack/react-query';

// Create a client with optimized settings
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      // Add caching optimizations
      cacheTime: 1000 * 60 * 30, // 30 minutes cache
      networkMode: 'offlineFirst', // Prioritize cached data when offline
      // Only refetch on mount for fast return visits
      refetchOnMount: false,
    },
  },
});