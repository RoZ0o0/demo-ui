import type { ClientResponse } from "../types/client";
import api from "./api";

export const getClients = async (): Promise<ClientResponse[]> => {
    const { data } = await api.get<ClientResponse[]>("/client");
    return data;
}

export const getCheckClientNipExists = async (nip: string): Promise<{exists: boolean}> => {
    const { data } = await api.get<{exists: boolean}>(`/client/exists?nip=${nip}`);
    return data;
}