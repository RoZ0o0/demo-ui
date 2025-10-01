import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useInvoiceForm } from '../../hooks/useInvoiceForm';
import type { InvoiceResponse } from '../../../../types/invoice';

interface InvoiceRowProps {
  invoice: InvoiceResponse;
  onDelete: (id: number) => void;
}

const InvoiceRow = ({ invoice, onDelete }: InvoiceRowProps) => {
  const navigate = useNavigate();
  const { openEditForm } = useInvoiceForm();

  return (
    <tr>
      <td>{invoice.invoiceNumber}</td>
      <td>{invoice.client.name}</td>
      <td>{invoice.totalGross?.toFixed(2)}</td>
      <td>
        <Button onClick={() => navigate(`/invoice/${invoice.publicToken}/preview`)}>Preview</Button>
        <Button onClick={() => onDelete(invoice.id)}>Delete</Button>
        <Button onClick={() => openEditForm(invoice)}>Edit</Button>
      </td>
    </tr>
  );
};

export default InvoiceRow;
