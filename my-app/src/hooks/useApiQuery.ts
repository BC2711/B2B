import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchApi } from '../api/axios';
import type { Method } from 'axios';
import type { ApiResponse } from '../types/InterfaceTypes';

export const useApiQuery = <T>(
    queryKey: string | unknown[], // Unique key for caching
    url: string, // Full or relative URL
    method: Method = 'GET',
    data?: unknown,
    params?: Record<string, unknown>,
    options?: UseQueryOptions<ApiResponse<T>, Error> // Extend options for customization
) => {
    return useQuery<ApiResponse<T>, Error>({
        queryKey: typeof queryKey === 'string' ? [queryKey] : queryKey,
        queryFn: () => fetchApi<T>(url, method, data, params),
        ...options, // Allow overriding retry, staleTime, etc.
    });
};