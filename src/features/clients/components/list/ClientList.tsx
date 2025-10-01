import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useClients } from '../../hooks';
import ClientTable from './ClientTable';
import SearchInput from '../../../../components/SearchInput';
import ListPagination from '../../../../components/ListPagination';

const ClientList = () => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [clientSearch, setClientSearch] = useState('');

  const { data, isLoading, isError, error } = useClients(clientSearch, page, size);

  const handlePageSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  return (
    <div className="flex flex-col p-8 w-full h-full">
      {!isLoading && !isError && data && (
        <>
          <SearchInput
            value={clientSearch}
            onChange={setClientSearch}
            placeholder="Search client..."
          />
          <div className="flex-1 overflow-auto p-4 rounded-xl">
            <ClientTable clients={data?.content ?? []} />
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
  );
};

export default ClientList;
