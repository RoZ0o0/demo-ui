import api from '../../../services/api';
import type { ClientRequest, PaginatedClientsResponse } from '../../../types/client';

const maxSize = 99999;

export const getClients = async (
  search: string,
  page: number = 0,
  size: number = maxSize,
): Promise<PaginatedClientsResponse> => {
  const { data } = await api.get<PaginatedClientsResponse>(
    `/client?search=${search}&page=${page}&size=${size}`,
  );
  return data;
};

export const getCheckClientNipExists = async (nip: string): Promise<{ exists: boolean }> => {
  const { data } = await api.get<{ exists: boolean }>(`/client/exists?nip=${nip}`);
  return data;
};

export const createClient = async (client: ClientRequest): Promise<number> => {
  const response = await api.post<number>('/client', client);
  return response.data;
};

export const updateClient = async (clientId: number, client: ClientRequest): Promise<number> => {
  const response = await api.put<number>(`/client/${clientId}`, client);
  return response.data;
};
