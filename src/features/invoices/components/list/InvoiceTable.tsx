import type { InvoiceResponse } from '../../../../types/invoice';
import InvoiceRow from './InvoiceRow';

interface InvoiceTableProps {
  invoices: InvoiceResponse[];
  onDelete: (id: number) => void;
}

const InvoiceTable = ({ invoices, onDelete }: InvoiceTableProps) => {
  return (
    <table className="w-full h-full">
      <thead>
        <tr>
          <th className="w-1/3">Number</th>
          <th className="w-1/3">Client</th>
          <th className="w-1/3">Total</th>
          <th>Actions</th>
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
