import Meta from '@/components/Meta';

import SymbolBoard from '@/components/SymbolBoard/SymbolBoard';
import TtsBoard from '../../components/TtsBoard/TtsBoard';
import { Box } from '@mui/material';

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />
      <Box flexDirection={'column'}>
        <TtsBoard></TtsBoard>
        <SymbolBoard></SymbolBoard>
      </Box>
    </>
  );
}

export default Welcome;
