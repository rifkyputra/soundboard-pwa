import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { FlexBox } from '@/components/styled';
import Sidebar from '@/sections/Sidebar';
import {
  Box,
  ButtonBase,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Switch,
} from '@mui/material';
import React from 'react';

import { Typography } from '@mui/material';
import { Feedback, InfoRounded } from '@mui/icons-material';
import useTheme from '@/store/theme';
import useModalManager from '@/store/modalManager';

const SettingsPage = () => {
  const [_, { toggle }] = useTheme();
  const [modal, { openFeedbackModal }] = useModalManager();

  return (
    <>
      <NavigationBar children={undefined}></NavigationBar>

      <FlexBox>
        {/* <Card>
          <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
            {Object.values([
              {
                title: 'Feedback',
                path: '/settings/feedback',
                icon: DefaultIcon,
              },
              {
                title: 'Voice',
                path: '/settings/voice',
                icon: DefaultIcon,
              },
            ])
              .filter((route) => route.title)
              .map(({ path, title, icon: Icon }) => (
                <ListItem sx={{ p: 0 }} key={path}>
                  <ListItemButton component={Link} to={path as string}>
                    <ListItemIcon>{Icon ? <Icon /> : <DefaultIcon />}</ListItemIcon>
                    <ListItemText>{title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Card> */}
        <FlexBox flexDirection={'column'} px={3} gap={3}>
          <h1>Settings</h1>
          <p>Settings page content</p>

          <Card>
            <Box display={'flex'} px={4} py={2}>
              <InfoRounded />
              <Typography>Dark Mode</Typography>

              <Switch onChange={() => toggle()}></Switch>
            </Box>
          </Card>

          <Card>
            <ButtonBase onClick={() => openFeedbackModal()}>
              <Box display={'flex'} px={4} py={2}>
                <Feedback />
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
