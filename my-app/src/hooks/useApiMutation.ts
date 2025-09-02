import { useState, useCallback } from 'react';
import { fetchApi } from '../api/axios';
import type { ApiResponse } from '../types/InterfaceTypes';

interface UseApiMutationOptions<T> {
  onSuccess?: (data: ApiResponse<T>) => void;
  onError?: (error: Error) => void;
}

export function useApiMutation<T, TData>(
  url: string,
  method: string,
  options: UseApiMutationOptions<T> = {}
) {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    async (data?: TData) => {
      setIsPending(true);
      try {
        const response = await fetchApi<T>(url, method, data);
        options.onSuccess?.(response.data);
        return response;
      } catch (error) {
        options.onError?.(error as Error);
        throw error;
      } finally {
        setIsPending(false);
      }
    },
    [url, method, options]
  );

  return { mutate, isPending };
}