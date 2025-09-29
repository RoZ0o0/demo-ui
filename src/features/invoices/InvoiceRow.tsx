import type { InvoiceResponse } from "../../types/invoice";

const InvoiceRow = ({ invoice }: { invoice: InvoiceResponse }) => {
    return (
        <tr>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.client.name}</td>
            <td>{invoice.totalGross?.toFixed(2)}</td>
            <td>
                <button>View</button>
            </td>
        </tr>
    )
}

export default InvoiceRow;