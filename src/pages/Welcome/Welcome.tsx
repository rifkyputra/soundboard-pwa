import Meta from '@/components/Meta';

import HomeBoard from '@/components/Homeboard/Homeboard';
import TtsBoard from '../../components/TtsBoard/TtsBoard';
import { Box, Grid } from '@mui/material';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GridColumnPadding from '@/layouts/BodyPadding';

function Welcome() {
  return (
    <>
      <Meta title="Welcome" />

      <NavigationBar children={undefined}></NavigationBar>

      <GridColumnPadding>
        <TtsBoard></TtsBoard>
        <HomeBoard></HomeBoard>
      </GridColumnPadding>
    </>
  );
}

export default Welcome;
