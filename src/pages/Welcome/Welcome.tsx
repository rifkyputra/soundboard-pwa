import Meta from '@/components/Meta';

import HomeBoard from '@/components/Homeboard/Homeboard';
import TtsBoard from '../../components/TtsBoard/TtsBoard';
import { Box } from '@mui/material';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />

      <NavigationBar children={undefined}></NavigationBar>

      <Box flexDirection={'column'}>
        <TtsBoard></TtsBoard>
        <HomeBoard></HomeBoard>
      </Box>
    </>
  );
}

export default Welcome;
