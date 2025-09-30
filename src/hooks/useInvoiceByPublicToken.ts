import { useQuery } from "@tanstack/react-query"
import type { InvoiceResponse} from "../types/invoice"
import { getInvoiceByPublicToken } from "../services/invoiceService"

export const useInvoiceByPublicToken = (publicToken?: string) => {
    return useQuery<InvoiceResponse, Error>({
        queryKey: ['invoices', publicToken],
        queryFn: () => getInvoiceByPublicToken(publicToken!),
        enabled: !!publicToken,
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};