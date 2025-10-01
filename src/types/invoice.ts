import type { ClientRequest, ClientResponse } from './client';
import type { InvoiceItemRequest, InvoiceItemResponse } from './invoiceItem';

export interface InvoiceRequest {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  client: ClientRequest;
  items: InvoiceItemRequest[];
}

export interface InvoiceResponse {
  id: number;
  publicToken: string;
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

export interface PaginatedInvoicesResponse {
  content: InvoiceResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
