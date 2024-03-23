import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { Box, Card, IconButton } from '@mui/material';
import useSituations from '@/store/situations';
import GridColumnPadding from '@/layouts/BodyPadding';
import { VolumeUp } from '@mui/icons-material';
import Push from '@/components/Push/push';

type Props = {};

const Situations = (props: Props) => {
  const [situations, { speakSituation }] = useSituations();
  return (
    <>
      <NavigationBar children={undefined}></NavigationBar>
      <GridColumnPadding>
        <Box>
          <h1> Situations </h1>

          <p> This is the Situations page. Here you can find all the situations you have saved. </p>

          {situations.map((situation) => (
            <Card>
              <Box display={'flex'} flexDirection={'row'} alignItems={'center'} px={3}>
                <IconButton onClick={() => speakSituation(situation)}>
                  <VolumeUp></VolumeUp>
                </IconButton>
                <h2> {situation.name} </h2>
                <Push />
                <p> {situation.description} </p>
                <Box></Box>
              </Box>
            </Card>
          ))}
        </Box>
      </GridColumnPadding>
    </>
  );
};

export default Situations;
