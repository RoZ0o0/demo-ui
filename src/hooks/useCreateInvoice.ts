import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { InvoiceRequest } from "../types/invoice";
import { createInvoice } from "../services/invoiceService";

export const useCreateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, InvoiceRequest>({
        mutationKey: ["createInvoice"],
        mutationFn: (invoice: InvoiceRequest) => createInvoice(invoice),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
        },
    });
}