import type { ClientRequest, ClientResponse } from "./client";
import type { InvoiceItemRequest, InvoiceItemResponse } from "./invoiceItem";

export interface InvoiceRequest {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: ClientRequest;
  items: InvoiceItemRequest[];
}

export interface InvoiceResponse {
  id: number;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: ClientResponse;
  items: InvoiceItemResponse[];
  totalNet: number;
  totalVat: number;
  totalGross: number;
  createdAt: string;
}

export interface PaginatedInvoices {
    content: InvoiceResponse[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}