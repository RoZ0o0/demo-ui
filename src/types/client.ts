export interface ClientRequest {
  name: string;
  nip: string;
  address?: string;
  email?: string;
  phone?: string;
}

export interface ClientResponse extends ClientRequest {
  id: number;
  createdAt: string;
}

export interface PaginatedClientsResponse {
  content: ClientResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
