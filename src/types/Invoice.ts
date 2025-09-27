import type { Client } from "./Client";
import type { InvoiceItem } from "./InvoiceItem";

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