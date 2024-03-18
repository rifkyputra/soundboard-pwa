import Meta from '@/components/Meta';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import HomeBoard from '@/components/Homeboard/Homeboard';
import TtsBoard from '@/components/TtsBoard/TtsBoard';
import { Box } from '@mui/system';
import React from 'react';
import PersonalBoard from '@/components/Personalboard/Personalboard';

type Props = {
  children: React.ReactNode;
};

const Personal = (props: Props) => {
  return (
    <>
      <Meta title="Welcome" />

      <NavigationBar children={undefined}></NavigationBar>

      <Box flexDirection={'column'}>
        <TtsBoard></TtsBoard>
        <PersonalBoard></PersonalBoard>
      </Box>
    </>
  );
};

export default Personal;
