import z from "zod";

export const clientRequestSchema = z.object({
    name: z.string().min(1, "Client name is required"),
    nip: z.string().min(1, "NIP is required"),
    address: z
        .string()
        .transform((val) => val.trim() || undefined)
        .optional()
        .nullable(),
    email: z
        .string()
        .optional()
        .nullable()
        .refine((val) => !val || val.trim() === "" || z.email().safeParse(val).success, {
            message: "Invalid email format",
        }),
    phone: z
        .string()
        .optional()
        .nullable()
        .refine((val) => !val || val.trim() === "" || val.trim().length >= 5, {
            message: "Phone must have at least 5 digits",
        }),
})