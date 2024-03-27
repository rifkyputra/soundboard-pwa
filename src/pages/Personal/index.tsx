import Meta from '@/components/Meta';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import TtsBoard from '@/components/TtsBoard/TtsBoard';
import { Box } from '@mui/system';
import React from 'react';
import PersonalBoard from '@/components/Personalboard/Personalboard';
import GridColumnPadding from '@/layouts/BodyPadding';
import { Button } from '@mui/material';
import useToggleEdit from '@/store/toggleEdit';

type Props = {
  children: React.ReactNode;
};

const Personal = (props: Props) => {
  const [isEdit, { toggleEdit }] = useToggleEdit();
  return (
    <>
      <Meta title="Personal Board" />

      <NavigationBar children={undefined}></NavigationBar>
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
