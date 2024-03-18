import Meta from '@/components/Meta';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import SymbolBoard from '@/components/SymbolBoard/SymbolBoard';
import TtsBoard from '@/components/TtsBoard/TtsBoard';
import { Box } from '@mui/system';
import React from 'react';

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
        <SymbolBoard></SymbolBoard>
      </Box>
    </>
  );
};

export default Personal;
