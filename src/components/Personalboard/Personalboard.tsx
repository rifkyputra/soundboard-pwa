import { Box, ButtonBase, Card, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import SymbolItem from '../SymbolItem/SymbolItem';
import { Add, AddCircle } from '@mui/icons-material';
import useToggleEdit from '@/store/toggleEdit';
import usePersonalboard from '@/store/personalboard';
import GridColumnPadding from '@/layouts/BodyPadding';
import useModalManager from '@/store/modalManager';

const PersonalBoard = () => {
  const [symbols] = usePersonalboard();
  const [modals, { openAddSymbolModal }] = useModalManager();
  // const boardIndex = 0;
  const [isEdit, toggleEdit] = useToggleEdit();

  return (
    <>
      <GridColumnPadding>
        <Grid container spacing={2} ml={1} mr={5}>
          <Grid item>
            <div
              onClick={() => {
                // ttsAction.addToTtsBoard(props?.symbol!);
                // speak({
                //   text: props?.symbol?.name ?? '',
                //   speechRate: 1,
                // });
              }}
            >
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
                      {/* {props?.symbol?.description} */}
                    </Box>
                  </Box>
                </Card>
              </ButtonBase>
            </div>
          </Grid>
          {symbols.map((symbol, index) => (
            <Grid item key={index}>
              <SymbolItem symbol={symbol} />
            </Grid>
          ))}
        </Grid>
      </GridColumnPadding>
    </>
  );
};

export default PersonalBoard;
