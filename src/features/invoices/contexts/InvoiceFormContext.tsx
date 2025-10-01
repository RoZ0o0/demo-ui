import { createContext, useState, type ReactNode } from "react";
import type { InvoiceResponse } from "../../../types/invoice";

interface InvoiceFormContextProps {
  isOpen: boolean;
  invoiceToEdit?: InvoiceResponse;
  openCreateForm: () => void;
  openEditForm: (invoice: InvoiceResponse) => void;
  closeForm: () => void;
}

const InvoiceFormContext = createContext<InvoiceFormContextProps | undefined>(undefined);

export const InvoiceFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<InvoiceResponse | undefined>(undefined);

  const openCreateForm = () => {
    setInvoiceToEdit(undefined);
    setIsOpen(true);
  };

  const openEditForm = (invoice: InvoiceResponse) => {
    setInvoiceToEdit(invoice);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setInvoiceToEdit(undefined);
  };

  return (
    <InvoiceFormContext.Provider
      value={{ isOpen, invoiceToEdit, openCreateForm, openEditForm, closeForm }}
    >
      {children}
    </InvoiceFormContext.Provider>
  );
};

export default InvoiceFormContext;