import { createContext, useState, type ReactNode } from 'react';
import type { ClientResponse } from '../../../types/client';

interface ClientFormContextType {
  isOpen: boolean;
  clientToEdit?: ClientResponse;
  openCreateForm: () => void;
  openEditForm: (client: ClientResponse) => void;
  closeForm: () => void;
}

const ClientFormContext = createContext<ClientFormContextType | undefined>(undefined);

export const ClientFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clientToEdit, setClientToEdit] = useState<ClientResponse | undefined>(undefined);

  const openCreateForm = () => {
    setClientToEdit(undefined);
    setIsOpen(true);
  };

  const openEditForm = (client: ClientResponse) => {
    setClientToEdit(client);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    setClientToEdit(undefined);
  };

  return (
    <ClientFormContext.Provider
      value={{ isOpen, clientToEdit, openCreateForm, openEditForm, closeForm }}
    >
      {children}
    </ClientFormContext.Provider>
  );
};

export default ClientFormContext;
