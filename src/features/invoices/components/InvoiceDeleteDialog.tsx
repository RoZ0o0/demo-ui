import type { FormEvent } from "react";
import BaseDialog from "../../../components/BaseDialog";
import { Button, Stack } from "@mui/material";

interface InvoiceDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const InvoiceDeleteDialog = ({ isOpen, onClose, onDelete }: InvoiceDeleteDialogProps) => {

    const handleOnClose = () => {
        onClose();
    }

      const handleAccept = (e: FormEvent) => {
        e.preventDefault();
        onDelete();
        onClose();
    };

    return (
        <>
            <BaseDialog
                isOpen={isOpen} 
                onClose={handleOnClose}
                title="Delete Invoice?"
            >
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="contained" color="error" onClick={handleAccept}>
                        Yes
                    </Button>
                    <Button variant="outlined" onClick={handleOnClose}>
                        No
                    </Button>
                </Stack>
            </BaseDialog>
        </>
    )
}

export default InvoiceDeleteDialog;