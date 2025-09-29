import z from "zod";
import { clientRequestSchema } from "./clientRequestSchema";
import { invoiceItemRequestSchema } from "./invoiceItemRequestSchema";

export const invoiceRequestSchema = z.object({
    invoiceNumber: z.string().min(1, "Invoice number is required"),
    issueDate: z.string().min(1, "Issue date is required"),
    dueDate: z.string().min(1, "Due date is required"),
    client: clientRequestSchema,
    items: z.array(invoiceItemRequestSchema).min(1, "At least one item is required")
})
.refine(
    (data) => {
        if (!data.issueDate || !data.dueDate) return true;
        const issue = new Date(data.issueDate);
        const due = new Date(data.dueDate);
        return due >= issue;
    },
    {
        message: "Due date cannot be before issue date",
        path: ["dueDate"],
    }
)