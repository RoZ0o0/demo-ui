import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import type { ReactNode } from "react";

interface BaseDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    actions?: ReactNode;
}

const BaseDialog = ({ isOpen, onClose, title, children, actions }: BaseDialogProps) => {
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
            <DialogActions>
                <Button onClick={onClose} autoFocus variant="contained">
                    Close
                </Button>
                {actions}
            </DialogActions>
        </Dialog>
    )
}

export default BaseDialog;

