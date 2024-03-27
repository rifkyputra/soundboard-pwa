import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';
import { SnackbarAction, snackbarArgs } from './type';

const snackbarState = atom<snackbarArgs>({
  key: 'snackbar-state',
  default: {
    open: false,
  },
});

function useSnackbarManager(): [snackbarArgs, SnackbarAction] {
  const [snackbar, setSnackbar] = useRecoilState(snackbarState);

  const openSnackbar = useCallback(
    (value: snackbarArgs) => {
      setSnackbar({
        open: true,
        ...value,
      });
    },
    [setSnackbar],
  );

  const closeSnackbar = useCallback(() => {
    setSnackbar({ open: false });
  }, [setSnackbar]);

  const memoizedActions = useMemo(
    () => ({ openSnackbar, closeSnackbar }),
    [openSnackbar, closeSnackbar],
  );

  return [snackbar, memoizedActions];
}

export default useSnackbarManager;
