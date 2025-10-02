import { useEffect, useState, type FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import type { ClientRequest, ClientResponse } from '../../../../types/client';
import { useCreateClient, useUpdateClient } from '../../hooks';
import { useCheckClientNipExists } from '../../../../hooks/useCheckClientNipExists';
import { getNipError } from '../../../../utils/nipValidation';
import { clientRequestSchema } from '../../../../schemas/clientRequestSchema';
import BaseDialog from '../../../../components/BaseDialog';

interface ClientFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  clientToEdit?: ClientResponse;
}

const ClientFormDialog = ({ isOpen, onClose, clientToEdit }: ClientFormDialogProps) => {
  const [client, setClient] = useState<ClientRequest>(
    clientToEdit || {
      name: '',
      nip: '',
      email: '',
      address: '',
      phone: '',
    },
  );

  useEffect(() => {
    if (clientToEdit) {
      setClient({
        name: clientToEdit.name ?? '',
        nip: clientToEdit.nip ?? '',
        email: clientToEdit.email ?? '',
        address: clientToEdit.address ?? '',
        phone: clientToEdit.phone ?? '',
      });
    }
  }, [clientToEdit, isOpen]);

  const [clientFormErrors, setClientFormErrors] = useState<Partial<Record<string, string>>>({});
  const [responseError, setResponseError] = useState('');

  const { mutate: createClient } = useCreateClient();
  const { mutate: updateClient } = useUpdateClient();
  const { data: clientNipExists } = useCheckClientNipExists(client.nip);

  const nipError = getNipError({
    clientNip: client.nip,
    clientNipExists,
    formErrors: clientFormErrors,
    editNip: clientToEdit?.nip,
  });

  const handleOnClose = () => {
    setClient({ name: '', nip: '', email: '', address: '', phone: '' });

    setClientFormErrors({});
    onClose();
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [field]: e.target.value });
  };

  const handleResponseError = (err: string) => {
    setResponseError(err);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = clientRequestSchema.safeParse(client);

    if (result.success) {
      if (clientToEdit) {
        updateClient(
          { id: clientToEdit.id, data: client },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (err: Error) => {
              handleResponseError(err.message);
            },
          },
        );
      } else {
        createClient(client, {
          onSuccess: () => {
            onClose();
          },
          onError: (err) => {
            onClose();
            handleResponseError(err.message);
          },
        });
      }
    } else {
      const fieldErrors: Partial<Record<string, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      setClientFormErrors(fieldErrors);
    }
  };

  return (
    <>
      <BaseDialog
        isOpen={isOpen}
        onClose={handleOnClose}
        title={clientToEdit ? 'Edit Client' : 'Create Client'}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-4 justify-center m-2 mb-4">
            <TextField
              label="Name"
              value={client.name}
              onChange={handleChange('name')}
              error={!!clientFormErrors.name}
              helperText={clientFormErrors.name}
            />
            <TextField
              label="NIP"
              value={client.nip}
              onChange={handleChange('nip')}
              error={!!nipError}
              helperText={nipError}
            />
            <TextField
              label="Email (Not required)"
              value={client.email}
              onChange={handleChange('email')}
              error={!!clientFormErrors.email}
              helperText={clientFormErrors.email}
            />
            <TextField
              label="Address (Not required)"
              value={client.address}
              onChange={handleChange('address')}
              error={!!clientFormErrors.address}
              helperText={clientFormErrors.address}
            />
            <TextField
              label="Phone (Not required)"
              value={client.phone}
              onChange={handleChange('phone')}
              error={!!clientFormErrors.phone}
              helperText={clientFormErrors.phone}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: '100%' }}
            disabled={
              clientNipExists === undefined ||
              (clientNipExists.exists && clientToEdit?.nip !== client.nip)
            }
          >
            {clientToEdit ? 'Update Client' : 'Create Client'}
          </Button>
          <span className="flex justify-center text-red-700">{responseError}</span>
        </form>
      </BaseDialog>
    </>
  );
};

export default ClientFormDialog;
