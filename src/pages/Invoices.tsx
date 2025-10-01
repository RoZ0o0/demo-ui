import { IconButton, Tooltip } from '@mui/material';
import { InvoiceFormProvider } from '../features/invoices/contexts/InvoiceFormContext';
import { useInvoiceForm } from '../features/invoices/hooks/useInvoiceForm';
import { InvoiceList } from '../features/invoices/components/list';
import { InvoiceFormDialog } from '../features/invoices/components/form';

const InvoicesPageContent = () => {
  const { isOpen, openCreateForm, invoiceToEdit, closeForm } = useInvoiceForm();

  return (
    <>
      <div className="relative w-full flex justify-center items-center pb-4">
        <h2 className="text-center text-2xl">Invoice List</h2>
        <div className="absolute right-0">
          <Tooltip title="Add invoice">
            <IconButton
              onClick={openCreateForm}
              size="small"
              className="w-8 h-8 p-0 rounded-full flex items-center justify-center !bg-green-400"
            >
              <span className="text-white text-2xl font-mono">+</span>
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="flex justify-center max-w-[800px] bg-white px-8 rounded-lg shadow-lg w-full h-full">
        <InvoiceList />
      </div>

      <InvoiceFormDialog isOpen={isOpen} onClose={closeForm} invoiceToEdit={invoiceToEdit} />
    </>
  );
};

const Invoices = () => (
  <InvoiceFormProvider>
    <InvoicesPageContent />
  </InvoiceFormProvider>
);

export default Invoices;
