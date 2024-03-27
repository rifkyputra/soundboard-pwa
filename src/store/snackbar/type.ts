import { ReactNode } from 'react';

export type snackbarArgs = {
  message?: string;
  action?: ReactNode;
  open?: boolean;
  handleClose?: () => void;
};
export type SnackbarAction = {
  openSnackbar: (value: snackbarArgs) => void;
  closeSnackbar: () => void;
};
