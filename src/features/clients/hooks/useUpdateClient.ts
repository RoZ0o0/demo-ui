import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ClientRequest } from '../../../types/client';
import { updateClient } from '../services/clientService';

interface UpdateClientPayload {
  id: number;
  data: ClientRequest;
}

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation<number, Error, UpdateClientPayload>({
    mutationKey: ['updateClient'],
    mutationFn: ({ id, data }) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
