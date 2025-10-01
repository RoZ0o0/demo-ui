import type { ClientResponse } from '../../../types/client';
import ClientRow from './ClientRow';

interface ClientTableProps {
  clients: ClientResponse[];
}

const ClientTable = ({ clients }: ClientTableProps) => {
  return (
    <table className="w-full h-full">
      <thead>
        <tr>
          <th className="w-1/3">Name</th>
          <th className="w-1/3">NIP</th>
          <th className="w-1/3">Email</th>
          <th className="w-1/3">Address</th>
          <th className="w-1/3">Phone</th>
          <th>Actions</th>
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
