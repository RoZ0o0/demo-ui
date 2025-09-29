import { useQuery } from "@tanstack/react-query"
import type { ClientResponse } from "../types/client";
import { getClients } from "../services/clientService";

export const useClients = () => {
    return useQuery<ClientResponse[], Error>({
        queryKey: ['clients'],
        queryFn: () => getClients(),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};