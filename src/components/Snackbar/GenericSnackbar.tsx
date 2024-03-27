import { Snackbar } from '@mui/material';
import { messages } from '@/config';
import { ReactNode } from 'react';
import { snackbarArgs } from '@/store/snackbar/type';

const GenericSnackbar = ({ message, action, handleClose, open }: snackbarArgs) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};

export default GenericSnackbar;
