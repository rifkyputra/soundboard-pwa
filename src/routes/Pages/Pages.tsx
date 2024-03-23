import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import routes from '..';
import { getPageHeight } from './utils';
import useModalManager from '@/store/modalManager';
import ModalRoot from '../../components/Modals/Modals';

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {Object.values(routes).map(({ path, component: Component }) => {
          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="/manifest.json" />
      </Routes>

      <ModalRoot />
    </Box>
  );
}

export default Pages;
