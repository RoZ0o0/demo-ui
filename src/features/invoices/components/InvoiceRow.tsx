import { useNavigate } from "react-router-dom";
import type { InvoiceResponse } from "../../../types/invoice";

const InvoiceRow = ({ invoice }: { invoice: InvoiceResponse }) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.client.name}</td>
            <td>{invoice.totalGross?.toFixed(2)}</td>
            <td>
                <button onClick={() => navigate(`/invoice/${invoice.publicToken}/preview`)}>Preview</button>
                <button></button>
            </td>
        </tr>
    )
}

export default InvoiceRow;