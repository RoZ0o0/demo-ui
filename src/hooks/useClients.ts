import { useQuery } from "@tanstack/react-query"
import type { PaginatedClientsResponse } from "../types/client";
import { getClients } from "../services/clientService";

export const useClients = (page: number = 0, size?: number) => {
    return useQuery<PaginatedClientsResponse, Error>({
        queryKey: ['clients', page, size],
        queryFn: () => getClients(page, size),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};