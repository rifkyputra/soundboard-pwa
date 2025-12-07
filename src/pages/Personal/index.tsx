import Meta from '@/components/Meta';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import TtsBoard from '@/components/TtsBoard/TtsBoard';
import { Box } from '@mui/system';
import React from 'react';
import PersonalBoard from '@/components/Personalboard/Personalboard';
import GridColumnPadding from '@/layouts/BodyPadding';

const Personal = () => {
  return (
    <>
      <Meta title="Personal Board" />

      <NavigationBar></NavigationBar>
      <GridColumnPadding>
        <Box flexDirection={'column'}>
          <TtsBoard></TtsBoard>

          <PersonalBoard></PersonalBoard>
        </Box>
      </GridColumnPadding>
    </>
  );
};

export default Personal;
