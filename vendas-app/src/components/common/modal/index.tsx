import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Definindo as props do modal
interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

export const DeleteModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Confirmar Exclusão
        </Button>
      </DialogActions>
    </Dialog>
  );
};