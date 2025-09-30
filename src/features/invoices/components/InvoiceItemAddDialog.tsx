import { useEffect, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import type { InvoiceItemRequest, InvoiceItemWithKey } from "../../../types/invoiceItem";
import { invoiceItemRequestSchema } from "../../../schemas/invoiceItemRequestSchema";
import BaseDialog from "../../../components/BaseDialog";

interface InvoiceItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: InvoiceItemRequest, key?: string) => void;
  initialItem?: InvoiceItemWithKey;
}

const InvoiceItemAddDialog = ({
  isOpen,
  onClose,
  onSave,
  initialItem,
}: InvoiceItemDialogProps) => {
    const [item, setItem] = useState<InvoiceItemRequest>({
        description: initialItem?.description || "",
        quantity: initialItem?.quantity || 0,
        unitPrice: initialItem?.unitPrice || 0,
    });

    useEffect(() => {
        if (isOpen) {
            setItem({
                description: initialItem?.description || "",
                quantity: initialItem?.quantity || 0,
                unitPrice: initialItem?.unitPrice || 0,
            });
        }
    }, [isOpen, initialItem]);

    const [errors, setErrors] = useState<Partial<Record<keyof InvoiceItemRequest, string>>>({});

    const handleSave = () => {
        const result = invoiceItemRequestSchema.safeParse(item);

        if (result.success) {
            onSave(item, initialItem?.__key);
            onClose();
        } else {
            const fieldErrors: Partial<Record<keyof InvoiceItemRequest, string>> = {};
            result.error.issues.forEach((err) => {
                const field = err.path[0] as keyof InvoiceItemRequest;
                if (field) {
                    fieldErrors[field] = err.message;
                }
            });
            setErrors(fieldErrors);
        }
    };

    return (
        <BaseDialog
            isOpen={isOpen}
            onClose={onClose}
            title={initialItem ? "Edit Item" : "Add Item"}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSave();
                }}
            >
                <Stack spacing={2}>
                    <TextField
                        label="Description"
                        value={item.description}
                        onChange={(e) => setItem({ ...item, description: e.target.value })}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
                        type="number"
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) => setItem({ ...item, quantity: +e.target.value })}
                        error={!!errors.quantity}
                        helperText={errors.quantity}
                    />
                    <TextField
                        type="number"
                        label="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) => setItem({ ...item, unitPrice: +e.target.value })}
                        error={!!errors.unitPrice}
                        helperText={errors.unitPrice}
                    />
                    <Button type="submit" variant="contained">
                        {initialItem ? "Update" : "Save"}
                    </Button>
                </Stack>
            </form>
        </BaseDialog>
    );
}

export default InvoiceItemAddDialog;