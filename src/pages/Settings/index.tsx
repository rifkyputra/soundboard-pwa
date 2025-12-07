import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { FlexBox } from '@/components/styled';
import { Box, ButtonBase, Card, Switch } from '@mui/material';
import React from 'react';

import { Typography } from '@mui/material';
import { DarkMode, Feedback } from '@mui/icons-material';
import useTheme from '@/store/theme';
import useModalManager from '@/store/modalManager';

const SettingsPage = () => {
  const [theme, { toggle }] = useTheme();
  const [, { openFeedbackModal }] = useModalManager();

  return (
    <>
      <NavigationBar></NavigationBar>

      <FlexBox>
        <FlexBox flexDirection={'column'} px={3} gap={3}>
          <h1>Settings</h1>

          <Card variant="outlined">
            <Box display={'flex'} alignItems={'center'} px={4} py={2}>
              <Box
                borderRadius={'50%'}
                padding={1}
                bgcolor={'primary.main'}
                margin={'auto'}
                display={'flex'}
                justifyItems={'center'}
                width={'2rem'}
                height={'2rem'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <DarkMode sx={{ color: 'background.paper', fontSize: 18 }} />
              </Box>
              <Box width={'1.1rem'}></Box>
              <Typography>Dark Mode</Typography>
              <Box width={'1.1rem'}></Box>
              <Switch
                checked={theme.includes('dark') ? true : false}
                onChange={() => toggle()}
              ></Switch>
            </Box>
          </Card>

          <Card variant="outlined">
            <ButtonBase onClick={() => openFeedbackModal()}>
              <Box display={'flex'} alignItems={'center'} px={4} py={2}>
                <Box
                  borderRadius={'50%'}
                  padding={1}
                  bgcolor={'primary.main'}
                  margin={'auto'}
                  display={'flex'}
                  justifyItems={'center'}
                  width={'2rem'}
                  height={'2rem'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Feedback sx={{ color: 'background.paper', fontSize: 18 }} />
                </Box>
                <Box width={'1.1rem'}></Box>
                <Typography>Feedback</Typography>
              </Box>
            </ButtonBase>
          </Card>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default SettingsPage;
