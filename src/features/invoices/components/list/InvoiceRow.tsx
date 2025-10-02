import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useInvoiceForm } from '../../hooks/useInvoiceForm';
import type { InvoiceResponse } from '../../../../types/invoice';
import { PreviewIcon } from '../../../../components/icons/PreviewIcon';
import { EditIcon } from '../../../../components/icons/EditIcon';
import { DeleteIcon } from '../../../../components/icons/DeleteIcon';

interface InvoiceRowProps {
  invoice: InvoiceResponse;
  onDelete: (id: number) => void;
}

const InvoiceRow = ({ invoice, onDelete }: InvoiceRowProps) => {
  const navigate = useNavigate();
  const { openEditForm } = useInvoiceForm();

  return (
    <tr>
      <td className="h-16">{invoice.invoiceNumber}</td>
      <td className="h-16">{invoice.client.name}</td>
      <td className="h-16">{invoice.totalGross?.toFixed(2)}</td>
      <td className="h-16">
        <div className="flex flex-row gap-x-1 w-1/7 justify-center mx-auto">
          <IconButton onClick={() => navigate(`/invoice/${invoice.publicToken}/preview`)}>
            <PreviewIcon />
          </IconButton>
          <IconButton onClick={() => openEditForm(invoice)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(invoice.id)}>
            <DeleteIcon color="red" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default InvoiceRow;
