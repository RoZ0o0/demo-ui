import type { ClientRequest, PaginatedClientsResponse } from "../types/client";
import api from "./api";

export const getClients = async (page: number = 0, size?: number): Promise<PaginatedClientsResponse> => {
    const params: Record<string, string> = { page: page.toString() };

    if (size !== undefined) {
        params.size = size.toString()
    }

    const { data } = await api.get<PaginatedClientsResponse>(`/client`, { params });
    return data;
}

export const getCheckClientNipExists = async (nip: string): Promise<{exists: boolean}> => {
    const { data } = await api.get<{exists: boolean}>(`/client/exists?nip=${nip}`);
    return data;
}

export const createClient = async (client: ClientRequest): Promise<number> => {
    const response = await api.post<number>("/client", client);
    return response.data;
}