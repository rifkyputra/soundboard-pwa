import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import SymbolItem from '../SymbolItem/SymbolItem';
import useHomeboard from '@/store/homeboard';
import { Add, AddCircle } from '@mui/icons-material';
import useToggleEdit from '@/store/toggleEdit';
import usePersonalboard from '@/store/personalboard';

const HomeBoard = () => {
  const [symbols] = useHomeboard();
  const [_, { addToBoard }] = usePersonalboard();
  // const boardIndex = 0;
  const [isEdit, { toggleEdit }] = useToggleEdit();

  return (
    <>
      <Box height={12}></Box>

      <Box
        justifyContent={'center'}
        alignContent={'center'}
        alignItems={'center'}
        // mx={10}
      >
        <Grid container spacing={2} justifyContent={'center'}>
          {symbols.map((symbol, index) => (
            <Grid item key={index}>
              <SymbolItem symbol={symbol} onAddToPersonal={() => addToBoard(symbol)} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HomeBoard;
