import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InvoiceRequest } from '../../../types/invoice';
import { updateInvoice } from '../services';

interface UpdateInvoicePayload {
  id: number;
  data: InvoiceRequest;
}

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, UpdateInvoicePayload>({
    mutationKey: ['updateInvoice'],
    mutationFn: ({ id, data }) => updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};
