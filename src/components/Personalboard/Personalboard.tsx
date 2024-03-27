import { Box, Button, ButtonBase, Card, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import SymbolItem from '../SymbolItem/SymbolItem';
import { Add, AddCircle } from '@mui/icons-material';
import useToggleEdit from '@/store/toggleEdit';
import usePersonalboard from '@/store/personalboard';
import GridColumnPadding from '@/layouts/BodyPadding';
import useModalManager from '@/store/modalManager';

const PersonalBoard = () => {
  const [symbols, { deleteFromBoard }] = usePersonalboard();
  const [modals, { openAddSymbolModal }] = useModalManager();
  // const boardIndex = 0;
  const [isEdit, { toggleEdit }] = useToggleEdit();

  return (
    <>
      <Box height={12}></Box>

      <Box justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
        <Grid container spacing={2} ml={1} mr={5} justifyContent={'center'}>
          <Grid item>
            <ButtonBase onClick={() => openAddSymbolModal()}>
              <Card variant="outlined">
                <Box
                  height={200}
                  width={200}
                  display="flex"
                  alignItems="center"
                  gap={4}
                  p={2}
                  justifyContent={'center'}
                >
                  <Box display={'flex'}>
                    <div className="symbol-text">
                      <Add></Add>
                    </div>
                  </Box>
                </Box>
              </Card>
            </ButtonBase>
          </Grid>
          {symbols.map((symbol, index) => (
            <Grid item key={index}>
              <SymbolItem
                symbol={symbol}
                onDelete={() => {
                  deleteFromBoard(symbol);
                }}
              />
            </Grid>
          ))}
          <Grid item>
            <ButtonBase onClick={() => openAddSymbolModal()}>
              <Box
                height={200}
                width={200}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                justifyContent={'center'}
              ></Box>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase onClick={() => openAddSymbolModal()}>
              <Box
                height={200}
                width={200}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                justifyContent={'center'}
              ></Box>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase onClick={() => openAddSymbolModal()}>
              <Box
                height={200}
                width={200}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                justifyContent={'center'}
              ></Box>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase onClick={() => openAddSymbolModal()}>
              <Box
                height={200}
                width={200}
                display="flex"
                alignItems="center"
                gap={4}
                p={2}
                justifyContent={'center'}
              ></Box>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PersonalBoard;
