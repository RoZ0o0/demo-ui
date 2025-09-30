import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice } from "../services";

export const useDeleteClient = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationKey: ["createInvoice"],
        mutationFn: (invoiceId: number) => deleteInvoice(invoiceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
        },
    });
}