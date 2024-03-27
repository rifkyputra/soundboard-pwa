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
import { Themes } from '@/theme/types';

const SettingsPage = () => {
  const [theme, { toggle }] = useTheme();
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

          <Card variant="outlined">
            <Box display={'flex'} px={4} py={2}>
              <InfoRounded />

              <Typography>Dark Mode</Typography>
              {theme}

              <Switch
                checked={theme.includes('dark') ? true : false}
                onChange={() => toggle()}
              ></Switch>
            </Box>
          </Card>

          <Card variant="outlined">
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
