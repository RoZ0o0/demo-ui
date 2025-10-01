import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../services';
import type { PaginatedInvoicesResponse } from '../../../types/invoice';

export const useInvoices = (search: string, page: number = 0, size: number = 5) => {
  return useQuery<PaginatedInvoicesResponse, Error>({
    queryKey: ['invoices', search, page, size],
    queryFn: () => getInvoices(search, page, size),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
