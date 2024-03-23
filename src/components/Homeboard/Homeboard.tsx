import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import SymbolItem from '../SymbolItem/SymbolItem';
import useHomeboard from '@/store/homeboard';
import { Add, AddCircle } from '@mui/icons-material';
import useToggleEdit from '@/store/toggleEdit';

const HomeBoard = () => {
  const [symbols] = useHomeboard();
  // const boardIndex = 0;
  const [isEdit, toggleEdit] = useToggleEdit();

  return (
    <>
      <Box justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
        <Grid container spacing={2} ml={1} mr={5}>
          {symbols.map((symbol, index) => (
            <Grid item key={index}>
              <SymbolItem symbol={symbol} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default HomeBoard;
