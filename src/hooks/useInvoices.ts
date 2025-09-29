import { useQuery } from "@tanstack/react-query"
import type { PaginatedInvoices } from "../types/invoice"
import { getInvoices } from "../services/invoiceService"

export const useInvoices = (page: number = 0, size: number = 5) => {
    return useQuery<PaginatedInvoices, Error>({
        queryKey: ['invoices', page, size],
        queryFn: () => getInvoices(page, size),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};