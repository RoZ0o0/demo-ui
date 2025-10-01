export interface InvoiceItemRequest {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate?: number;
}

export interface InvoiceItemResponse extends InvoiceItemRequest {
  id: number;
  netValue: number;
  vatValue: number;
  grossValue: number;
  invoiceId: number;
}

export interface InvoiceItemWithKey extends InvoiceItemRequest {
  __key: string;
}
