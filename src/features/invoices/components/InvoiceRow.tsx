import { useNavigate } from "react-router-dom";
import type { InvoiceResponse } from "../../../types/invoice";
import { Button } from "@mui/material";

type InvoiceRowProps = {
    invoice: InvoiceResponse,
    onDelete: (id: number) => void;
}

const InvoiceRow = ({ invoice, onDelete }: InvoiceRowProps) => {
    const navigate = useNavigate();

    return (
        <tr>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.client.name}</td>
            <td>{invoice.totalGross?.toFixed(2)}</td>
            <td>
                <Button onClick={() => navigate(`/invoice/${invoice.publicToken}/preview`)}>Preview</Button>
                <Button onClick={() => onDelete(invoice.id)}>Delete</Button>
            </td>
        </tr>
    )
}

export default InvoiceRow;