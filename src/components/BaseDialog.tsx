import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { ReactNode } from 'react';

interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
}

const BaseDialog = ({ isOpen, onClose, title, children }: BaseDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} disableRestoreFocus={true}>
      {title && <DialogTitle sx={{ alignSelf: 'center' }}>{title}</DialogTitle>}
      <DialogContent sx={{ width: 600 }}>{children}</DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
