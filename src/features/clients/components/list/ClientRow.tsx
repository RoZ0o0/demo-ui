import { IconButton } from '@mui/material';
import type { ClientResponse } from '../../../../types/client';
import { useClientForm } from '../../hooks/useClientForm';
import { EditIcon } from '../../../../components/icons/EditIcon';

interface ClientRowProps {
  client: ClientResponse;
}

const ClientRow = ({ client }: ClientRowProps) => {
  const { openEditForm } = useClientForm();

  return (
    <tr className="text-sm leading-none">
      <td className="h-16">{client.name}</td>
      <td className="h-16">{client.nip}</td>
      <td className="h-16">{client.email}</td>
      <td className="h-16">{client.address}</td>
      <td className="h-16">{client.phone}</td>
      <td className="h-16">
        <IconButton onClick={() => openEditForm(client)}>
          <EditIcon />
        </IconButton>
      </td>
    </tr>
  );
};

export default ClientRow;
