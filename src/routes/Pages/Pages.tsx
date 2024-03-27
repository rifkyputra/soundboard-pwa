import { Route, Routes, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import { getPageHeight } from './utils';
import ModalRoot from '../../components/Modals/Modals';
import GenericSnackbar from '@/components/Snackbar/GenericSnackbar';
import useSnackbarManager from '@/store/snackbar';
import { useEffect } from 'react';
import useToggleEdit from '@/store/toggleEdit';

function Pages() {
  const [snackbar] = useSnackbarManager();
  const location = useLocation();
  const [edit, { toggleEdit }] = useToggleEdit();
  useEffect(() => {
    console.log('url changed');
    toggleEdit(false);
  }, [location]);

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="/manifest.json" />
      </Routes>

      <ModalRoot />
      <GenericSnackbar
        action={snackbar.action}
        handleClose={snackbar.handleClose}
        message={snackbar.message}
        open={snackbar.open}
      />
    </Box>
  );
}

export default Pages;
