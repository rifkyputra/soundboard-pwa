import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { FlexBox } from '@/components/styled';
import Sidebar from '@/sections/Sidebar';
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import React from 'react';

import routes from '@/routes';
import DefaultIcon from '@mui/icons-material/Deblur';
import { Link } from 'react-router-dom';

const SettingsPage = () => {
  return (
    <>
      <NavigationBar children={undefined}></NavigationBar>

      <FlexBox>
        <Card>
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
        </Card>
        <FlexBox flexDirection={'column'} px={3}>
          <h1>Settings</h1>
          <p>Settings page content</p>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default SettingsPage;
