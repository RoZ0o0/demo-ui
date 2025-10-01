import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useDeleteClient, useInvoices } from '../../hooks';
import InvoiceTable from './InvoiceTable';
import { InvoiceDeleteDialog } from '../delete';
import SearchInput from '../../../../components/SearchInput';
import ListPagination from '../../../../components/ListPagination';

const InvoiceList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [invoiceSearch, setInvoiceSearch] = useState('');

  const { data, isLoading, isError, error } = useInvoices(invoiceSearch, page, size);
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

  const handlePageSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  return (
    <>
      <div className="flex flex-col p-8 w-full h-full max-w-[800px]">
        {!isLoading && !isError && data && (
          <>
            <SearchInput
              value={invoiceSearch}
              onChange={setInvoiceSearch}
              placeholder="Search invoice..."
            />
            <div className="flex-1 overflow-auto p-4 rounded-xl">
              <InvoiceTable invoices={data?.content ?? []} onDelete={openDeleteDialog} />
            </div>

            <div className="flex justify-center mt-auto">
              <ListPagination
                page={page}
                totalPages={data.totalPages}
                pageSize={size}
                onPageChange={setPage}
                onPageSizeChange={handlePageSizeChange}
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
