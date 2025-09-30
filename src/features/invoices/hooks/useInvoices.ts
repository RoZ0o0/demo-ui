import { useQuery } from "@tanstack/react-query"
import { getInvoices } from "../services";
import type { PaginatedInvoicesResponse } from "../../../types/invoice";

export const useInvoices = (page: number = 0, size: number = 5) => {
    return useQuery<PaginatedInvoicesResponse, Error>({
        queryKey: ['invoices', page, size],
        queryFn: () => getInvoices(page, size),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};