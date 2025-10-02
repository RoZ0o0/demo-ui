import type { ClientResponse } from '../../../../types/client';
import ClientRow from './ClientRow';

interface ClientTableProps {
  clients: ClientResponse[];
}

const ClientTable = ({ clients }: ClientTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-1/6">Name</th>
          <th className="w-1/6">NIP</th>
          <th className="w-1/6">Email</th>
          <th className="w-1/6">Address</th>
          <th className="w-1/6">Phone</th>
          <th className="w-1/6">Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
