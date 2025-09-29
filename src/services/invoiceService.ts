import type { InvoiceRequest, PaginatedInvoices } from "../types/invoice";
import api from "./api";

export const getInvoices = async (page: number = 0, size: number = 5): Promise<PaginatedInvoices> => {
    const { data } = await api.get<PaginatedInvoices>(`/invoice?page=${page}&size=${size}`);
    return data;
}

export const createInvoice = async (invoice: InvoiceRequest): Promise<number> => {
    const response = await api.post<number>("/invoice", invoice);
    return response.data;
}