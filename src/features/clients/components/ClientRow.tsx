import type { ClientResponse } from "../../../types/client";

const ClientRow = ({ client }: { client: ClientResponse }) => {
    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.nip}</td>
            <td>{client.email}</td>
            <td>{client.address}</td>
            <td>{client.phone}</td>
            <td>
                <button>View</button>
            </td>
        </tr>
    )
}

export default ClientRow;