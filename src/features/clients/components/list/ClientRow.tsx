import { Button } from '@mui/material';
import type { ClientResponse } from '../../../../types/client';
import { useClientForm } from '../../hooks/useClientForm';

interface ClientRowProps {
  client: ClientResponse;
}

const ClientRow = ({ client }: ClientRowProps) => {
  const { openEditForm } = useClientForm();

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.nip}</td>
      <td>{client.email}</td>
      <td>{client.address}</td>
      <td>{client.phone}</td>
      <td>
        <Button onClick={() => openEditForm(client)}>Edit</Button>
      </td>
    </tr>
  );
};

export default ClientRow;
