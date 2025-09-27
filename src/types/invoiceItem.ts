export type InvoiceItem = {
  id?: number;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate?: number;
  netValue?: number;
  vatValue?: number;
  grossValue?: number;
  invoiceId?: number;
};