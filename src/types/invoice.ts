import type { Client } from "./client";
import type { InvoiceItem } from "./invoiceItem";

export type Invoice = {
  id?: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  totalNet?: number;
  totalVat?: number;
  totalGross?: number;
  client: Client;
  items: InvoiceItem[];
  createdAt?: string;
};

export interface PaginatedInvoices {
    content: Invoice[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}