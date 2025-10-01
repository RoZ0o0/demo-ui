import { IconButton, Tooltip } from '@mui/material';
import { useClientForm } from '../features/clients/hooks/useClientForm';
import { ClientFormProvider } from '../features/clients/contexts/ClientFormContext';
import { ClientList } from '../features/clients/components/list';
import { ClientFormDialog } from '../features/clients/components/form';

const ClientsPageContent = () => {
  const { isOpen, openCreateForm, clientToEdit, closeForm } = useClientForm();

  return (
    <>
      <div className="relative w-full flex justify-center items-center pb-4">
        <h2 className="text-center text-2xl">Client List</h2>
        <div className="absolute right-0">
          <Tooltip title="Add client">
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

      <div className="bg-white px-8 rounded-lg shadow-lg w-full h-full">
        <ClientList />
      </div>

      <ClientFormDialog isOpen={isOpen} onClose={closeForm} clientToEdit={clientToEdit} />
    </>
  );
};

const Clients = () => (
  <ClientFormProvider>
    <ClientsPageContent />
  </ClientFormProvider>
);

export default Clients;
