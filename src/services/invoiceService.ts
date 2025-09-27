import type { PaginatedInvoices } from "../types/Invoice";
import api from "./api";

export const getInvoices = async (page: number = 0, size: number = 5): Promise<PaginatedInvoices> => {
    const { data } = await api.get<PaginatedInvoices>(`/invoice?page=${page}&size=${size}`);
    return data;
}