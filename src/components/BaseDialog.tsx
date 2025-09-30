import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import type { ReactNode } from "react";

interface BaseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    actions?: ReactNode;
}

const BaseDialog = ({ isOpen, onClose, title, children }: BaseDialogProps) => {
    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose}
            disableRestoreFocus={true}
        >
            { title && <DialogTitle>{title}</DialogTitle> }
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default BaseDialog;

