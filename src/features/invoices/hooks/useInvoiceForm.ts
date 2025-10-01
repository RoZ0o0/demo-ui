import { useContext } from 'react';
import InvoiceFormContext from '../contexts/InvoiceFormContext';

export const useInvoiceForm = () => {
  const context = useContext(InvoiceFormContext);
  if (!context) throw new Error('useInvoiceForm must be used within InvoiceFormProvider');
  return context;
};
