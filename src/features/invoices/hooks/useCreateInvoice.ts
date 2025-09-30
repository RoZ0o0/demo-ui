import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createInvoice } from "../services";
import type { InvoiceRequest } from "../../../types/invoice";

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