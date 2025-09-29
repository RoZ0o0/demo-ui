import z from "zod";

export const invoiceItemRequestSchema = z.object({
    description: z.string().min(1, "Description is required"),
    quantity: z
        .number()
        .int("Quantity must be a whole number")
        .min(1, "Quantity must be 1 or more"),
    unitPrice: z
        .number()
        .min(1, "Unit price must be 1 or more")
    
})
