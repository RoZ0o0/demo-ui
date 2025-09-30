import { useState } from "react";
import { CircularProgress, Pagination } from "@mui/material";
import ClientTable from "./ClientTable";
import { useClients } from "../../hooks/useClients";

const ClientList = () => {
  const [page, setPage] = useState(0);
  const size = 5;
  const { data, isLoading, isError, error } = useClients(page, size);

  return (
    <div className="flex flex-col p-8 w-full h-full">
      { !isLoading && !isError && 
        <>
          <div className="flex-1 overflow-auto p-4 rounded-xl">
            <ClientTable clients={data?.content ?? []} />
          </div>

          <div className="flex justify-center mt-auto">
            <Pagination
              count={data?.totalPages ?? 0}
              page={page + 1}
              onChange={(_, value) => setPage(value - 1)}
            />
          </div>
        </>
      }
      { isLoading && 
        <div className="flex flex-1 justify-center items-center">
          <CircularProgress />
        </div>
      }
      { isError && 
        <div className="flex flex-1 justify-center items-center">
          <h2 className="font-bold">{ error.message }</h2>
        </div>
      }
    </div>
  );
}

export default ClientList;