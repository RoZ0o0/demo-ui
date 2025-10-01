import api from '../../../services/api';
import type {
  InvoiceRequest,
  InvoiceResponse,
  PaginatedInvoicesResponse,
} from '../../../types/invoice';

export const getInvoices = async (
  search: string,
  page: number = 0,
  size: number = 5,
): Promise<PaginatedInvoicesResponse> => {
  const { data } = await api.get<PaginatedInvoicesResponse>(
    `/invoice?search=${search}&page=${page}&size=${size}`,
  );
  return data;
};

export const createInvoice = async (invoice: InvoiceRequest): Promise<number> => {
  const response = await api.post<number>('/invoice', invoice);
  return response.data;
};

export const deleteInvoice = async (invoiceId: number): Promise<void> => {
  const response = await api.delete<void>(`/invoice/${invoiceId}`);
  return response.data;
};

export const getInvoiceByPublicToken = async (publicToken: string): Promise<InvoiceResponse> => {
  const { data } = await api.get<InvoiceResponse>(`/invoice/${publicToken}/preview`);
  return data;
};

export const updateInvoice = async (
  invoiceId: number,
  invoice: InvoiceRequest,
): Promise<number> => {
  const response = await api.put<number>(`/invoice/${invoiceId}`, invoice);
  return response.data;
};
