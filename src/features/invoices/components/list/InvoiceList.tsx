import { useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';
import { useDeleteClient, useInvoices } from '../../hooks';
import InvoiceTable from './InvoiceTable';
import { InvoiceDeleteDialog } from '../delete';

const InvoiceList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const size = 5;

  const { data, isLoading, isError, error } = useInvoices(page, size);
  const { mutate: deleteClient } = useDeleteClient();

  const openDeleteDialog = (invoiceId: number) => {
    setSelectedInvoiceId(invoiceId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedInvoiceId(null);
  };

  const handleDelete = () => {
    if (selectedInvoiceId !== null) {
      deleteClient(selectedInvoiceId);
    }
    closeDeleteDialog();
  };

  return (
    <>
      <div className="flex flex-col p-8 w-full h-full max-w-[800px]">
        {!isLoading && !isError && (
          <>
            <div className="flex-1 overflow-auto p-4 rounded-xl">
              <InvoiceTable invoices={data?.content ?? []} onDelete={openDeleteDialog} />
            </div>

            <div className="flex justify-center mt-auto">
              <Pagination
                count={data?.totalPages ?? 0}
                page={page + 1}
                onChange={(_, value) => setPage(value - 1)}
              />
            </div>
          </>
        )}
        {isLoading && (
          <div className="flex flex-1 justify-center items-center">
            <CircularProgress />
          </div>
        )}
        {isError && (
          <div className="flex flex-1 justify-center items-center">
            <h2 className="font-bold">{error.message}</h2>
          </div>
        )}
      </div>
      <InvoiceDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDelete}
      />
    </>
  );
};

export default InvoiceList;
