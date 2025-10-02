import type { InvoiceResponse } from '../../../../types/invoice';
import InvoiceRow from './InvoiceRow';

interface InvoiceTableProps {
  invoices: InvoiceResponse[];
  onDelete: (id: number) => void;
}

const InvoiceTable = ({ invoices, onDelete }: InvoiceTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="w-1/4">Invoice Number</th>
          <th className="w-1/4">Client</th>
          <th className="w-1/4">Total</th>
          <th className="w-1/4">Actions</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {invoices.map((inv) => (
          <InvoiceRow key={inv.id} invoice={inv} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default InvoiceTable;
